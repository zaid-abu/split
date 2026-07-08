import { useState } from "react";
import { Pressable, StyleSheet, TextInput, type TextInputProps, View } from "react-native";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

interface AuthFieldProps extends TextInputProps {
  icon: SymbolViewProps["name"];
  error?: string;
  isPassword?: boolean;
}

export function AuthField({ icon, error, isPassword = false, secureTextEntry, style, ...props }: AuthFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const shouldHideText = isPassword ? isPasswordHidden : secureTextEntry;

  return (
    <View style={styles.container}>
      <View style={[styles.field, isFocused && styles.fieldFocused, !!error && styles.fieldError]}>
        <SymbolView name={icon} size={22} tintColor={theme.colors.textSecondary} />
        <TextInput
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={shouldHideText}
          onFocus={(event) => {
            setIsFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            props.onBlur?.(event);
          }}
          style={[styles.input, style]}
          {...props}
        />
        {isPassword ? (
          <Pressable
            accessibilityLabel={isPasswordHidden ? "Show password" : "Hide password"}
            accessibilityRole="button"
            hitSlop={theme.spacing[2]}
            onPress={() => setIsPasswordHidden((current) => !current)}
          >
            <SymbolView
              name={isPasswordHidden ? "eye.slash" : "eye"}
              size={21}
              tintColor={theme.colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <AppText role="caption" tone="negative" style={styles.errorText}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[2],
    width: "100%",
  },
  field: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: theme.spacing[3],
    minHeight: 64,
    paddingHorizontal: theme.spacing[5],
  },
  fieldFocused: {
    borderColor: theme.colors.accent,
  },
  fieldError: {
    borderColor: theme.colors.negative,
  },
  input: {
    color: theme.colors.textPrimary,
    flex: 1,
    fontFamily: theme.typography.family,
    fontSize: theme.typography.callout.fontSize,
    minWidth: 0,
  },
  errorText: {
    paddingLeft: theme.spacing[1],
  },
});
