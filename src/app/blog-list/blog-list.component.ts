import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogsApiproviderProvider } from 'src/providers/apiprovider/blogs-provider';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  @ViewChild('PageContent', { static: true }) PageContent: any;

  public data: any;
  private apiClient: BlogsApiproviderProvider;
  commentData = { "user_id": 101, "post_id": 0, "comment_text": "", "comment_level": 0, "parent_comm_id": 0, };
  blogsData = { "user_id": 101, "text": "" }
  respData: any;
  textComment: string;
  ckeConfig: any;

  constructor(apiClient: BlogsApiproviderProvider) {
    this.apiClient = apiClient;
    // NOTE: This would normally be some unpredictable value set by the server.
    document.cookie = "XSRF-TOKEN=server-generated-token";
  }

  ngOnInit() {
    this.loadBlogs();

  }

  toggleChild(node) {
    node.show_comment = !node.show_comment;
  }

  public async loadBlogs(): Promise<void> {
    try {

      this.data = await this.apiClient.get({
        url: "blogs",
        params: {
          user_id: 101,
          nextpage: 0
        }
      });

      for (var i = 0; i < (this.data.BlogsData.records.length); i++) {
        var flatstru = await this.flatToHierarchy(this.data.BlogsData.records[i].comments)
        //console.log(flatstru)
        this.data.BlogsData.records[i].comments = flatstru
      }

      console.log(this.data)
    } catch (error) {
      console.error(error);
    }
  }

  public async sumbit(item, post_id) {

    this.commentData.postId = post_id
    this.commentData.commentText = this.textComment
    this.commentData.comment_level = 0
    this.commentData.parent_comm_id = 0

    this.respData = await this.apiClient.post({
      url: "comments",
      data: this.commentData
    });

    debugger;
    if (this.respData && this.respData.status == 200) {
      if (typeof (item.comments) == 'undefined' || item.comments == null) {
        item.comments = []
      }
      item.comments.push(this.respData.result)
      this.textComment = '';
    }

  }

  public async sumbitPost() {

    this.respData = await this.apiClient.post({
      url: "blogs",
      data: this.blogsData
    });

    //debugger;
    if (this.respData && this.respData.status == 200) {
      if (typeof (this.data.records) == 'undefined') {
        this.data.records = []
      }
      this.data.records.push(this.respData.result)
      this.blogsData.text = '';
      this.textComment = '';
    }
  }


  public async flatToHierarchy(flat) {

    var roots = [] // things without parent

    // make them accessible by guid on this map
    var all = {}

    flat.forEach(function (item) {
      all[item.comment_id] = item
    })

    // connect childrens to its parent, and split roots apart
    Object.keys(all).forEach(function (comment_id) {
      var item = all[comment_id]
      if (item.parent_comm_id === null || item.parent_comm_id === 0) {
        roots.push(item)
      } else if (item.parent_comm_id in all) {
        var p = all[item.parent_comm_id]
        if (!('Children' in p)) {
          p.Children = []
        }
        p.Children.push(item)
      }
    })

    // done!
    return roots
  }

}


