import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on User {
        id
        firstName
        lastName
        email
        profilePic
        role
        createdAt
      }
      ... on Error {
        message
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ... on User {
        id
        firstName
      }
      ... on Error {
        message
      }
    }
  }
`;

// export const CREATE_POST = gql`
//   mutation createPost($title: String!, $catagory: String!, $image: Upload!) {
//     createPost(title: $title, catagory: $catagory, image: $image) {
//       title
//       catagory
//       image
//       createdAt
//     }
//   }
// `;

export const LIKE = gql`
  mutation like($id: Int!) {
    like(id: $id) {
      message
    }
  }
`;

export const COMMENT = gql`
  mutation comment($id: Int!, $text: String!) {
    comment(id: $id, text: $text) {
      id
      text
      createdAt
      user {
        firstName
        lastName
        profilePic
      }
    }
  }
`;

export const APPROVE = gql`
  mutation approvePost($id: Int!) {
    approvePost(id: $id) {
      message
    }
  }
`;

export const REJECT = gql`
  mutation rejectPost($id: Int!) {
    rejectPost(id: $id) {
      message
    }
  }
`;

export const CREATE_ADMINI = gql`
  mutation createAdmin($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createAdmin(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ... on User {
        id
      }
      ... on Error {
        message
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateUser($firstName: String, $lastName: String, $email: String, $phoneNumber: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber) {
      ... on Error {
        message
      }
      ... on Response {
        message
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
      ... on Error {
        message
      }
      ... on Response {
        message
      }
    }
  }
`;
