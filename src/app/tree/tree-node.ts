export interface TreeNode {
   
    Children: any[];
    comment_id: Number;
    comment_level: Number;
    comment_text: string;
    create_at: string;
    parent_comm_id: Number;
    post_id: Number;
    reply_count: Number;
    show_comment: boolean;
    user_id: Number;
    show_reply: boolean;
    reply_comment_text: string;
}