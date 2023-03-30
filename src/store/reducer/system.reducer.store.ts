import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";
import { serializeAxiosError } from "configs/reducer.config";
import { cleanEntity } from "helpers/object.helper";
import DeviceInfo from "react-native-device-info";
import { APP_URL } from "../../configs/index";

interface InitialState {
  subscriptionIds: string[]
  tokenFirebase: string
  isConnectedInternet: boolean
  firstInstall: {
    language: boolean
    isUSUnit: boolean
    chooseCountry: boolean
  }
  config: any
  isPremiumTrial: {
    overWord: string
    cleanChat: string
    changeTheme: string
    addNewChat: string
    changeModel: string
    renameGroup: string
  }
}

const initialState: InitialState = {
  subscriptionIds: [],
  tokenFirebase: "",
  isConnectedInternet: true,
  firstInstall: {
    language: false,
    isUSUnit: false,
    chooseCountry: false
  },
  config: null,
  isPremiumTrial: {
    overWord: "",
    cleanChat: "",
    changeTheme: "",
    addNewChat: "",
    changeModel: "",
    renameGroup: ""
  }
};

/**
 * ZipEnter
 * Be used to set token firebase to account
 */
export const setTokenFirebase = createAsyncThunk(
  "system/setTokenFirebase",
  async (token: string) => {
    let paramDevice = {
      device_uuid: await DeviceInfo.getUniqueId(),
      device_signature: token,
    };

    let response = await axios.patch<any>(`${APP_URL.APP_AJAX_URL}/user/update-session`, cleanEntity(paramDevice));
    if (response.status === 200) {
      await AsyncStorage.setItem("whitegFcmToken", token);
      return token;
    } else throw "error update firebase token";
  },
  { serializeError: serializeAxiosError }
);

export const getSystem = createAsyncThunk(
  "system/getSystem",
  async (_, thunkApi) => {
    return await axios.get<any>(`${APP_URL.APP_AJAX_URL}/config/list/config_ads_v1.0.1`);
  },
  { serializeError: serializeAxiosError }
);

export const System = createSlice({
  name: "system",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      return {
        ...state,
        language: action.payload,
      };
    },
    setSubscriptionIds: (state, action) => {
      return {
        ...state,
        subscriptionIds: action.payload,
      };
    },
    setIsPremiumTrial: (state, action) => {
      return {
        ...state,
        isPremiumTrial: {
          ...state.isPremiumTrial,
          ...action.payload
        },
      };
    },
    resetIsPremiumTrial: (state) => {
      return {
        ...state,
        isPremiumTrial: {
          overWord: "",
          cleanChat: "",
          changeTheme: "",
          addNewChat: "",
          changeModel: "",
          renameGroup: ""
        },
      }
    },
    setFirstInstall: (state, action) => {
      return {
        ...state,
        firstInstall: {
          ...state.firstInstall,
          ...action.payload,
        },
      };
    },
    setIsConnectedInternet: (state, action) => {
      return {
        ...state,
        isConnectedInternet: action.payload,
      };
    },
    setRatingApp: (state, action) => {
      return {
        ...state,
        ratingApp: action.payload,
      };
    },
    setHeightWeightUnit: (state, action) => {
      return {
        ...state,
        heightWeightUnit: action.payload,
      };
    },
    setDistanceUnit: (state, action) => {
      return {
        ...state,
        distanceUnit: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setTokenFirebase.fulfilled, (state, action) => {
        state.tokenFirebase = action.payload;
      })
      .addCase(setTokenFirebase.rejected, (state, action) => {
        state.tokenFirebase = "";
      })
      .addMatcher(isFulfilled(getSystem), (state, action) => {
        return {
          ...state,
          config: action.payload.data,
        };
      })
  },
});

export const {
  setLanguage,
  setIsConnectedInternet,
  setRatingApp,
  setHeightWeightUnit,
  setDistanceUnit,
  setFirstInstall,
  setIsPremiumTrial,
  resetIsPremiumTrial,
  setSubscriptionIds
} =
  System.actions;

// Reducer
export default System.reducer;
