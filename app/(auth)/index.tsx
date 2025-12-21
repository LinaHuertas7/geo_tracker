import AuthHeader from '@/components/auth/AuthHeader';
import Input from '@/components/form/Input';
import { Text } from '@react-navigation/elements';
import { useState } from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';

import Button from '@/components/button/Button';
import { createAuthStyles } from './auth.styles';

export default function HomeScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
	const [loading, setLoading] = useState(false);

	const colorScheme = useColorScheme();
	const styles = createAuthStyles(colorScheme ?? 'light');

	const handleAuth = () => {
        console.log(isLogin ? 'Login pressed' : 'Sign Up pressed');
    }

	const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
    }

	return (
		<ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View>
                {isLogin ? (
                    <AuthHeader
                        title="Sign In"
                        subtitle="Hi! Welcome back, you've been missed"
                    />
                ) : (
                    <AuthHeader
                        title="Create Account"
                        subtitle="Welcome! Please fill in the details to continue"
                    />
                )}

                <View>
                    {!isLogin && (
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                        />
                    )}

                    <Input
                        label="Email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        error={errors.email}
                    />

                    <View style={styles.passwordContainer}>
                        <Input
                            label="Password"
                            placeholder="••••••••••"
                            value={password}
                            onChangeText={setPassword}
                            isPassword
                            error={errors.password}
                        />
                        {isLogin && (
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        )}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title={isLogin ? "Sign In" : "Create Account"}
                        onPress={handleAuth}
                        loading={loading}
                    />
                </View>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Text>
                    <View style={styles.dividerLine} />
                </View>

                    <Button
                        title={isLogin ? "Sign Up" : "Sign In"}
                        onPress={toggleAuthMode}
                        variant="secondary"
                    />
            </View>
        </ScrollView>
  );
}
