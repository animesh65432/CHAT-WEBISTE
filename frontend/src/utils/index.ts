//https://GroupChat-webiste-ijjj.onrender.com

export const baseurl = "http://localhost:4000";

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
