import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Status: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

export type HomeProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

type StatusScreeenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Status"
>;
type StatusScreenRouteProp = RouteProp<RootStackParamList, "Status">;

export type StatusProps = {
  route: StatusScreenRouteProp;
  navigation: StatusScreeenNavigationProp;
};

export interface EmailType {
  id: number;
  email: string;
}

export interface LocationType {
  latitude: number;
  longitude: number;
}
