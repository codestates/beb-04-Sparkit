import MainList from "../components/MainList";
import { useRecoilState } from "recoil";
import { postsState } from "../states/spark";

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

export default function Mypage() {
  const [postData] = useRecoilState(postsState);

  return (
    <>
      <MainList data={postData} />
    </>
  );
}
