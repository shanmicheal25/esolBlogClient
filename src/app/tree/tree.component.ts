import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { TreeNode } from './tree-node';
import { BlogsApiproviderProvider } from 'src/providers/apiprovider/blogs-provider';




@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() treeData: TreeNode[];

  commentData = { "user_id": 101, "post_id": 0, "comment_text": "", "comment_level": 0, "parent_comm_id": 0, };

  respData: any
  inputTextValue: string


  private apiClient: BlogsApiproviderProvider;

  constructor(apiClient: BlogsApiproviderProvider) {
    this.apiClient = apiClient;
  }


  ngOnInit() {
  }

  toggleChild(node) {
    node.show_comment = !node.show_comment;
  }

  reply(node) {
    node.show_reply = !node.show_reply;
  }

  public async sumbit(node) {
    console.log(node)
    console.log("infor lua : " + this.inputTextValue)
    this.commentData.postId = node.post_id;
    this.commentData.commentText = node.reply_comment_text
    this.commentData.comment_level = node.comment_level
    this.commentData.parent_comm_id = node.comment_id

    this.respData = await this.apiClient.post({
      url: "comments",
      data: this.commentData
    });

    if (this.respData && this.respData.status == 200) {
      debugger;
      if (typeof (node.Children) == 'undefined') {
        node.Children = []
      }
      node.Children.push(this.respData.commentsData)
      node.reply_count = node.reply_count + 1
      node.show_reply = false
    }




  }



}
