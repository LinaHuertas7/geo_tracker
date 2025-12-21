import { AuthHeaderProps } from "@/types/form";
import { Text } from "@react-navigation/elements";
import { useColorScheme, View } from "react-native";
import { createAuthHeaderStyles } from "./auth-header";

const AuthHeader:React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
const colorScheme = useColorScheme();
  const styles = createAuthHeaderStyles(colorScheme ?? 'light');

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export default AuthHeader;
