import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id:Int,
    email:String,
    password:String,
    nickname:String,
    account:String,
    balance:String,
    private_key:String,
    created_at:String,
    updated_at:String,
    posts:[Post]
  }

  type Post {
    id:Int,
    title:String,
    post_content:String,
    user_id:Int,
    created_at:String,
    hashtags:[Hashtag],
    comments:[Comment],
    writer:User,
    likes:[Like],
    images:[Image]
  }

  type Like {
    id:Int,
    post_id:Int,
    user_id:Int
  }

  type Comment {
    id:Int,
    comment:String,
    post_id:Int,
    user_id:Int
    writer:User
  }

  type Hashtag{
    id:Int,
    hashtag:String
  }

  type Image{
    id:Int,
    image_path:String,
    post_id:Int
  }

  type Token {
    access_token:String
  }
  
  type Mutation {
    createUser(email:String!, password:String!, nickname:String!):Int!
    login(email:String!, password:String!):Token
  }

  type Query {
    getUserInfo(user_id:Int, access_token:String):User
  }
`;