import React from 'react'
import { getAllPosts } from '../../lib';
import { blogConfig as config } from '../config/blog.config';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout'
import Posts from '../components/posts'

import styles from './styles';
interface PropsI {
  allPosts?: Array<any>
}

const useStyles = makeStyles(styles);

const Home: ComponentType<PropsI> = ({ allPosts }: PropsI) => {
    const classes = useStyles();  

    if (!allPosts && allPosts.length < 1) {
      return <>Data is not ready (is undefined?)</>
    }

    return (
        <Layout>
          <Posts data={allPosts}/>
        </Layout>
    )
}   

export async function getStaticProps() {
    const posts = getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "coverImageAlt",
        "excerpt",
        "draft"
      ]);

    const startIndex = 0
    const endIndex = config.postsPerPage
    const prevPosts = null
    const nextPosts = endIndex >= posts.length ? null : 2

    return {
      props: {
        allPosts: posts.slice(startIndex, endIndex), prevPosts, nextPosts
      }, 
    }
  }

export default Home; 