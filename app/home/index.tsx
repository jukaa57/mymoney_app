import { ScrollView, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Painel } from "./_components/Painel";
import { NavBar } from "./_components/NavBar";
import { Dashboard } from "./_components/Dashboard";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const data = {
    username: 'John',
    balance: 12345.67,
    profile: 'https://wild-avatar-kingdom.netlify.app/images/birds/owlavatar.png'
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 10, paddingTop: 40, paddingBottom: 15, justifyContent: "center", alignItems: 'center', backgroundColor}}>
        <Painel
          data={data}
        />

        <NavBar
        />
         
        <Dashboard
        />
      </View>
    </ScrollView>
  );
}
