import { InputStyles } from "@/components/form/input.styles";
import { Colors } from "@/constants/theme";
import { AuthInputProps } from "@/types/form";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { Pressable, TextInput, useColorScheme, View } from "react-native";

const Input: React.FC<AuthInputProps> = ({ label, placeholder, value, onChangeText, isPassword = false, error, editable = true, keyboardType }) => {

	const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);
  const colorScheme = useColorScheme();
  const styles = InputStyles(colorScheme ?? 'light');
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          editable={editable}
          keyboardType={keyboardType}
        />
        {isPassword && (
          <Pressable
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >

          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );


};

export default Input;
