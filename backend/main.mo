import Nat "mo:base/Nat";

import Array "mo:base/Array";
import List "mo:base/List";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Time.Time;
  };

  stable var nextPostId: Nat = 0;
  stable var posts: List.List<Post> = List.nil();

  public func createPost(title: Text, body: Text, author: Text) : async Result.Result<Nat, Text> {
    let post: Post = {
      id = nextPostId;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := List.push(post, posts);
    nextPostId += 1;
    #ok(post.id)
  };

  public query func getPosts() : async [Post] {
    List.toArray(List.reverse(posts))
  };
}
