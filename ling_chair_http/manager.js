/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 资源类
 */

const viewBinding = NData.mount($("#app").get(0))

let client

function setUpClient(server) {
    if (server && server !== "")
        client = new io(server, {
            auth: {
                name: localStorage.isSignIn === "false" ? null : localStorage.userName
            }
        })
    else
        client = new io({
            auth: {
                name: localStorage.isSignIn === "false" ? null : localStorage.userName
            }
        })

    client.on("connect", () => {
        User.auth()
    })
}

window.viewBinding = viewBinding
window.setUpClient = setUpClient
window.client = client
