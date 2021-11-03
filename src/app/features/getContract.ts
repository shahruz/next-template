import { JsonRpcProvider } from "@ethersproject/providers";
import { Signer } from "@ethersproject/abstract-signer";
import { GM_CAM_CONTRACT_ADDRESS } from "./AddressBook";
import { GmCam__factory } from "../sdk/factories/GmCam__factory";

const getContract = (provider: JsonRpcProvider | Signer) => {
  return GmCam__factory.connect(GM_CAM_CONTRACT_ADDRESS, provider);
};

export default getContract;
