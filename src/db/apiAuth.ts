import supabase from "./supabase";

export interface LoginData {
    email: string;
    password: string;
}

//* login function ===> 
export async function login(loginData: LoginData) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
    })

    console.log(loginData.email, loginData.password);


    if (error) throw new Error(error.message)

    return data;
}


//* get the current user ===> 
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }

    return user;
}


//* upload profile_pic in supabase ==>
async function uploadProfilePic(file: File) {
    const fileName: string = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
        .from("profile_pic")  // supabase storage bucket name
        .upload(fileName, file)

    if (error)
        throw new Error(`Upload error: ${error.message}`)

    // get the public URL of profile_pic
    const { data: publicUrlData } = supabase.storage
        .from("profile_pic")
        .getPublicUrl(fileName)

    /*
    {
        data: { publicUrl: "https://your-supabase-url/image.jpg" },
        error: null
    }
    */

    return publicUrlData.publicUrl
}

//* signup data interface
export interface SignUpData {
    name: string,
    email: string,
    password: string,
    profile_pic: File | null
}

//* signup function ===>
export async function signup(signUpData: SignUpData) {

    // only upload profile picture if it's provided 
    let profielePicUrl: string | null = null
    if (signUpData.profile_pic) {
        profielePicUrl = await uploadProfilePic(signUpData.profile_pic);
        if (!profielePicUrl) throw new Error("Failed to upload Profile Picture");
    }


    const { data: newUserData, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
            data: {
                name: signUpData.name,
                //* only include `profile_pic` if it's avilable 
                ...(profielePicUrl) && { prifile_pic: profielePicUrl }
            }
        }
    })

    if (error) throw new Error(`error in signup: ${error.message}`);

    console.log(`user signed up with data: ${newUserData}`);

    return newUserData;
} 