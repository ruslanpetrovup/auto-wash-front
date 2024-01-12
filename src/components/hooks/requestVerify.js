import axios from "axios";

const requestVerify = async (token) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER}/user/verify`,
      { token }
    );

    if (result.data.status === 404) {
      localStorage.setItem("token", "");
      document.location.reload();
      return { error: true, data: result.data };
    }
    if (result.data.status === 500) {
      localStorage.setItem("token", "");
      document.location.reload();
      return { error: true, data: result.data };
    }
    if (result.data.status === 200) {
      return { error: false, data: result.data.data };
    }

    return { error: false, data: result.data.data };
  } catch (err) {
    console.log(err);
    return { error: true, data: err };
  }
};

export default requestVerify;
