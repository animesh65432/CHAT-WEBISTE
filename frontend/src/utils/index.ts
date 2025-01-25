export const baseurl = "https://chat-backend-application-ux1g.onrender.com";

export const fixthestring = (str: string) => {
    if (str.length === 0) {
        return ""
    }

    let newstr = ""

    for (let i = 0; i < str.length; i++) {

        if (str[i] === "*") {
            continue
        }
        else {
            newstr += str[i]
        }
    }

    return newstr
}
