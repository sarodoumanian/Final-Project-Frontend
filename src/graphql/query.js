import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
      id
      firstName
      lastName
      email
      role
      createdAt
      profilePic
      phoneNumber
      posts
    }
  }
`;

export const LOGOUT = gql`
  query logout {
    logout {
      message
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      id
      title
      catagory
      image
      status
      createdAt
      owner {
        firstName
        lastName
        role
        profilePic
      }
      comments {
        id
        text
        createdAt
        user {
          firstName
          lastName
          profilePic
        }
      }
      likes {
        id
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_ALL_MY_POSTS = gql`
  query getAllMyPosts {
    getAllMyPosts {
      id
      title
      catagory
      image
      status
      createdAt
      owner {
        firstName
        lastName
        profilePic
      }
      comments {
        id
        text
        createdAt
        user {
          firstName
          lastName
          profilePic
        }
      }
      likes {
        id
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      catagory
      image
      status
      createdAt
      owner {
        firstName
        lastName
        profilePic
      }
    }
  }
`;

export const GET_NEW_POSTS = gql`
  query getNewPosts {
    getNewPosts {
      id
      title
      catagory
      image
      status
      createdAt
      owner {
        firstName
        lastName
        profilePic
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      firstName
      lastName
      profilePic
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      email
      createdAt
      profilePic
      role
    }
  }
`;

export const GET_POSTS_BY_USER_ID = gql`
  query getPostsByUserId($userId: Int!) {
    getPostsByUserId(userId: $userId) {
      id
      title
      catagory
      image
      status
      createdAt
      owner {
        firstName
        lastName
        profilePic
      }
      comments {
        id
        text
        createdAt
        user {
          firstName
          lastName
          profilePic
        }
      }
      likes {
        id
        user {
          firstName
          lastName
        }
      }
    }
  }
`;
