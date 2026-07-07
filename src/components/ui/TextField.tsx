import React, { forwardRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

export interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, error, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.container}>
        {label && (
          <AppText role="callout" style={styles.label}>
            {label}
          </AppText>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={theme.colors.textMuted}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            !!error && styles.inputError,
            style,
          ]}
          {...props}
        />
        {error && (
          <AppText role="caption" tone="negative" style={styles.errorText}>
            {error}
          </AppText>
        )}
      </View>
    );
  }
);

TextField.displayName = "TextField";

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[2],
    width: "100%",
  },
  label: {
    paddingLeft: theme.spacing[1],
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.family,
    fontSize: theme.typography.bodyRegular.fontSize,
    minHeight: 48,
    paddingHorizontal: theme.spacing[4],
  },
  inputFocused: {
    borderColor: theme.colors.accent,
  },
  inputError: {
    borderColor: theme.colors.negative,
  },
  errorText: {
    paddingLeft: theme.spacing[1],
  },
});
