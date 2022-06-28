import styled from "styled-components";
import { useState, useEffect, useMemo, MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { postsState } from "../states/spark";
import { gql, useQuery } from "@apollo/client";
import { darkTheme } from "../styles/theme";
import { useRouter } from "next/router";
import { GetPosts, Hashtags, BackColor, Tags } from "../types/spark";

interface TagsCount {
  [name: string]: { id: number; count: number };
}

interface Obj {
  name: string;
  id: number;
  count: number;
}

interface Results {
  getPosts: GetPosts[];
}

interface Results2 {
  getPostsByHashtag: GetPosts[];
}

const ALL_POST = gql`
  query GetPosts {
    getPosts {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        id
        hashtag
      }
      comments {
        post_id
        user_id
        comment
      }
      likes
      writer {
        nickname
      }
    }
  }
`;

const ALL_POST_BY_HASHTAG = gql`
  query GetPostsByHashtag($hashtagId: Int) {
    getPostsByHashtag(hashtag_id: $hashtagId) {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        id
        hashtag
      }
      comments {
        post_id
        user_id
        comment
      }
      likes
      writer {
        nickname
      }
    }
  }
`;

const Aside = () => {
  const { data, refetch } = useQuery<Results>(ALL_POST);
  const { data: data2 } = useQuery<Results2>(ALL_POST_BY_HASHTAG, {
    variables: { hashtagId: 34 },
  });
  const [, setPostData] = useRecoilState(postsState);
  const [tags, setTags] = useState<Tags[]>([]);
  const [obj, setObj] = useState<Obj[]>([]);
  const router = useRouter();
  const { pathname } = router;
  const sortTagCountArr = (arr: Obj[]) => {
    return arr.sort(function (a, b) {
      return b.count - a.count;
    });
  };

  const tagsCountObj = (arr: Tags[]) => {
    const newObj: TagsCount = {};
    arr.forEach((item) => {
      for (let i = 0; i < item.tags.length; i++) {
        const tag = item.tags[i].hashtag;
        if (newObj[tag]) newObj.tag.count += 1;
        else newObj[tag] = { count: 1, id: item.tags[i].id };
      }
    });
    return newObj;
  };

  const tagsCountArr = (obj: TagsCount) => {
    const arr = [];
    for (let key in obj) {
      arr.push({ name: key, count: obj[key].count, id: obj[key].id });
    }
    return arr;
  };

  const handleTagClick = (item: number) => {
    if (!data2) return;
    setPostData(data2.getPostsByHashtag);
  };
  const handleTagAllClick = () => {
    refetch();
    if (!data) return;
    setPostData(data.getPosts);
  };

  useEffect(() => {
    if (!data) return;
    const tags = data.getPosts
      .map((item) => {
        return { tags: item.hashtags };
      })
      .flat();

    setTags(tags);
    setPostData(data.getPosts);
  }, [data]);

  useEffect(() => {
    if (!tags) return;
    const result1 = tagsCountObj(tags);
    const result2 = tagsCountArr(result1);
    const sortedArr = sortTagCountArr(result2);
    setObj(sortedArr);
  }, [tags]);

  const tagList = useMemo(() => {
    return obj.slice(0, 7).map((item, index) => {
      return (
        <AsideLi key={item.name + index}>
          <AsideLiButton type="button" onClick={() => handleTagClick(item.id)}>
            {item.name}
          </AsideLiButton>
        </AsideLi>
      );
    });
  }, [obj]);

  return (
    <AsideAside>
      <AsideContainer>
        <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
          <ul>
            <AsideLi>
              {pathname === "/MyPage" ? "userInfo" : "공지사항"}
            </AsideLi>
            <AsideLi>
              <p>hi</p>
            </AsideLi>
            <AsideLi>
              <p>hi2</p>
            </AsideLi>
          </ul>
        </AsideDiv>
        <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
          <nav>
            <ul>
              <AsideLi>
                <AsideLiButton type="button" onClick={handleTagAllClick}>
                  전체 태그
                </AsideLiButton>
              </AsideLi>
              {obj !== [] && tagList}
            </ul>
          </nav>
        </AsideDiv>
      </AsideContainer>
    </AsideAside>
  );
};

export default Aside;

const AsideAside = styled.aside`
  position: relative;
  width: 20vw;
  min-width: 250px;
  max-width: 280px;
`;

const AsideLi = styled.li``;

const AsideContainer = styled.div`
  position: fixed;
  width: inherit;
  top: 120px;
  min-width: 250px;
  max-width: 280px;
`;

const AsideDiv = styled.div<BackColor>`
  background-color: ${(props) => props.backgroundColor};
  height: 300px;
  border-radius: 4px;
  margin: 20px;
  padding: 16px 20px;
`;

const AsideLiButton = styled.button`
  font-size: 14px;
  outline: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  width: 100%;
  padding: 14px 16px;
  text-align: left;
  color: ${darkTheme.accentColor};
  background-color: transparent;

  &:hover {
    font-weight: bold;
    color: #5fee99;
  }
`;
