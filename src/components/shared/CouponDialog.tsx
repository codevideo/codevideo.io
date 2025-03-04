import * as React from "react";
import {
  AlertDialog,
  Button,
  Flex,
  Text,
  Box,
  Code,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

// Two main ways to use this component:
// 1. With custom trigger elements (pass children)
// 2. As a standalone button (specify buttonText)

export interface ICouponDialogProps {
  // Optional callback when dialog is opened
  onOpen?: () => void;
  // Optional callback when dialog is closed
  onClose?: () => void;
  // Optional custom button text (if not using children)
  buttonText?: string;
  // Optional button variant
  buttonVariant?: "solid" | "soft" | "outline" | "ghost";
  // Optional button color
  buttonColor?: "mint" | "indigo" | "cyan" | "gray" | "tomato";
  // Optional custom children to use as trigger
  children?: ReactNode;
}

export function CouponDialog(props: ICouponDialogProps) {
  const {
    onOpen,
    onClose,
    buttonText = "Get Discount",
    buttonVariant = "soft",
    buttonColor = "mint",
    children
  } = props;

  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);
  const couponCode = "SAVE75";

  const handleOpen = useCallback(() => {
    if (onOpen) onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    // Reset copied state when dialog closes
    setCopied(false);
    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
      copyTimeout.current = null;
    }
  }, [onClose]);

  const handleCopyCode = useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(couponCode).then(() => {
        setCopied(true);

        // Clear any existing timeout
        if (copyTimeout.current) {
          clearTimeout(copyTimeout.current);
        }

        // Reset copied state after 2 seconds
        copyTimeout.current = setTimeout(() => {
          setCopied(false);
          copyTimeout.current = null;
        }, 2000);
      });
    }
  }, [couponCode]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);

  return (
    <AlertDialog.Root onOpenChange={(open) => {
      if (open) handleOpen();
      else handleClose();
    }}>
      {children ? (
        <AlertDialog.Trigger>
          {children}
        </AlertDialog.Trigger>
      ) : (
        <AlertDialog.Trigger>
          <Button variant={buttonVariant} color={buttonColor}>
            {buttonText}
          </Button>
        </AlertDialog.Trigger>
      )}

      <AlertDialog.Content>
        <Flex direction="column" gap="4" align="center" justify="center">
          <AlertDialog.Title size="6" align="center">
            Easter Egg Unlocked: Early Adopter Discount!
          </AlertDialog.Title>

          <AlertDialog.Description size="4" align="center">
            We suck and don't have a full checkout yet. Since this is super annoying but you're still interested in being an early adopter,
            we're happy to give you our 75% off code for when we launch!
          </AlertDialog.Description>

          <Box
            p="4"
            style={{
              background: "linear-gradient(315deg, #008a5c 0%, #295244 100%)",
              borderRadius: 8,
              width: "100%"
            }}
          >
            <Flex justify="between" align="center" gap="2">
              <Box /> {/* Spacer for visual balance */}
              <Code size="5" variant="ghost" style={{ color: "white" }}>{couponCode}</Code>
              <Tooltip content={copied ? "Copied!" : "Copy to clipboard"} open={copied ? true : undefined}>
                <IconButton
                  variant="ghost"
                  color="gray"
                  onClick={handleCopyCode}
                  style={{
                    color: "white",
                    opacity: copied ? 1 : 0.8,
                    transition: "opacity 0.2s ease-in-out"
                  }}
                  aria-label="Copy discount code"
                >
                  {copied ? (
                    <CheckIcon />
                  ) : (
                    <CopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Flex>
          </Box>

          <AlertDialog.Description size="4" align="center">
            Keep this code handy and we guarantee it will be valid when we launch!
          </AlertDialog.Description>

          <Flex gap="3" justify="center" mt="2">
            <AlertDialog.Action>
              <Button variant="solid" color="mint">
                Word, Got It!
              </Button>
            </AlertDialog.Action>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

// Copy icon component
function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
    </svg>
  );
}

// Check icon component
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
    </svg>
  );
}

// Utility component to create a trigger for the CouponDialog
export interface ICouponDialogTriggerProps {
  // The button text
  children: ReactNode;
  // Optional button variant
  variant?: "solid" | "soft" | "outline" | "ghost";
  // Optional button color
  color?: "mint" | "indigo" | "cyan" | "gray" | "tomato";
  // Optional callback when dialog is opened
  onOpen?: () => void;
  // Optional callback when dialog is closed
  onClose?: () => void;
}

export function CouponDialogTrigger(props: ICouponDialogTriggerProps) {
  const { children, variant = "soft", color = "mint", onOpen, onClose } = props;

  return (
    <CouponDialog onOpen={onOpen} onClose={onClose}>
      <Button variant={variant} color={color}>
        {children}
      </Button>
    </CouponDialog>
  );
}