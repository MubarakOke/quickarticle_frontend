import {gql} from '@apollo/client'

export const LOGIN= gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password:$password){
            token
            user{
                id
                firstName
                lastName
                middleName
                email
                createdAt
                updatedAt
            }
            }
        }
`

export const CREATEUSER= gql`
    mutation createUser($firstName: String!, $lastName: String!, $middleName: String, $email: String!, $password: String!){
        createUser(firstName:$firstName, lastName:$lastName, middleName:$middleName, email:$email, password:$password){
            token
            user{
                id
                firstName
                lastName
                middleName
                email,
                createdAt
                updatedAt
            }
            }
    } 
`

export const CREATEARTICLE= gql`
    mutation createArticle($title: String!, $description: String!){
        createArticle(title:$title, description:$description){
            id
            title
            userId
            description
        }
    }
`
export const UPDATEARTICLE= gql`
    mutation updateArticle($id: Int!, $title: String!, $description: String!){
        updateArticle(id:$id, title:$title, description:$description){
            id
            title      
            description
            createdAt
            updatedAt
        }
    }
`
export const DELETEARTICLE= gql`
    mutation deleteArticle($id: Int!){
        deleteArticle(id:$id)
    }
`