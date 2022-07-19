import {gql} from '@apollo/client'


export const allUsers= gql`
    query {
        allUsers{
            id
            firstName
            lastName
            middleName
            email,
            createdAt
            updatedAt
        }
    }
`
export const getUser= gql`
    query agetUser($id: Int){
        agetUser(id: $id){
            id
            firstName
            lastName
            middleName
            email,
            createdAt
            updatedAt
        }
    }
`

export const allArticles= gql`
  query {
        allArticles{
            id
            title
            userId
            description
            createdAt
            updatedAt
        }
  } 
`

export const getArticle= gql`
  query  getArticle($id: Int){
    getArticle(id: $Id){
            id
            title
            userId
            description
            createdAt
            updatedAt
        }
  } 
`