import MainList from "../components/MainList";
import { useRecoilState } from "recoil";
import { postsState } from "../states/spark";

import { gql, useQuery } from "@apollo/client";
import { GetPosts } from "../types/spark";

// export async function getStaticProps() {
//     const { data } = await client.query({
//       query: gql`
//         query User {
//           User {
//             email
//             nickname
//             account
//             balance
//             private_key
//             created_at
//           }
//         }
//       `,
//     });

//     return {
//       props: {
//         User: data.countries.slice(0, 4),
//       },
//    };
//   }

const ALL_POST_BY_USER_ID = gql`
  query GetPostByUser($userId: Int) {
    getPostByUser(user_id: $userId) {
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

interface GetPostsByUser {
  getPostByUser: GetPosts[];
}

export default function Mypage() {
  const [postData] = useRecoilState(postsState);
  const { data, refetch } = useQuery<GetPostsByUser>(ALL_POST_BY_USER_ID, {
    variables: { userId: 1 },
  });

  return <>{data && <MainList data={data.getPostByUser} />}</>;
}
