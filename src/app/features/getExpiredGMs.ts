import { request, gql } from "graphql-request";
import dayjs from "dayjs";

export const GRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/internetcamera/gm-cam";

// TODO: pull these types from somewhere safe

// enum GMState {
//   INITIATED = "INITIATED",
//   COMPLETED = "COMPLETED",
// }

// type Film = {
//   id: string;
//   expiresAt: string;
// };

// type GM = {
//   id: string;
//   state: GMState;
//   expiresAt: string;
//   ipfsHash?: string;
//   sender: { id: string };
//   recipient: { id: string };
//   partner?: GM;
// };

const GRAPH_QUERY_GMS = gql`
  query ExpiredGms($from: BigInt) {
    gms(where: { expiresAt_lt: $from }) {
      id
      expiresAt
    }
  }
`;

const GRAPH_QUERY_FILM = gql`
  query ExpiredGms($from: BigInt) {
    gmfilms(where: { expiresAt_lt: $from }) {
      id
      expiresAt
    }
  }
`;

export const getExpiredGMs = () => {
  const nowInSeconds = dayjs().unix();
  const data = request(GRAPH_URL, GRAPH_QUERY_GMS, {
    from: nowInSeconds,
  });
  return data;
};

export const getExpiredFilm = () => {
  const nowInSeconds = dayjs().unix();
  const data = request(GRAPH_URL, GRAPH_QUERY_FILM, {
    from: nowInSeconds,
  });
  return data;
};
