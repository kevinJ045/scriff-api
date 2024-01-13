import { URLS } from "./data/constant/url.const";
import { AuthClass } from "./logic/auth.class";
import { FS } from "./logic/file.class";
import { RemoteClass } from "./logic/remote.class";
import { SocketClass } from "./logic/socket.class";
import { UserClass } from "./logic/user.class";

namespace Scriff {
  export const url = new URLS();
  export const auth = new AuthClass(Scriff);
  export const user = new UserClass(Scriff);
  export const socket = new SocketClass(Scriff);
  export const remote = new RemoteClass(Scriff);
  export const fs = new FS(Scriff);
}

export default Scriff;
