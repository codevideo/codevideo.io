import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

// given a 2d array of Tokens, i.e. Token[][], and a monaco theme, this function returns an array of characters with their foreground and background colors
export const colorCodeCharacter = (
  lineIndex: number,
  characterIndex: number,
  tokens: monaco.Token[][],
  theme: monaco.editor.IStandaloneThemeData,
  character: string,
): monaco.editor.ITokenThemeRule => {

  // if the character is a bracket, parenthesis, semicolon, or colon, then we return white immediate as foreground color
  if (
    character === "{" ||
    character === "}" ||
    character === "(" ||
    character === ")" ||
    character === ";" ||
    character === "=" ||
    character === "," ||
    character === ":" ||
    character === "!"
  ) {
    return {
      token: "",
      foreground: "#f8f8f2",
    };
  }

  // first get the line from the tokens
  const lineTokens = tokens[lineIndex];
  
  // then get the token from the line - we know where it is based on the offset of the character
  const token = lineTokens.find((token) => token.offset == characterIndex);

  // this occurs when the token is empty (and also actually undefined), but really its for the case when it is empty :)
  if (token === undefined) {
    return {
      token: "",
    };
  }

  // console.log('JSON.stringify(token)', JSON.stringify(token))

  // for some reason the editor tokens have an extension of their file type, ex. '.ts'
  // so we need to remove that before matching the token type in the theme (since themes are regardless of language)
  
  const tokenType =
    token.type.substring(0, token.type.lastIndexOf(".")) || token.type;
  // console.log("token.type", `"${token.type}"`);
  // console.log("tokenType", `"${tokenType}"`);
  // const foreground = tokenType === 'identifier' ? 'f8f8f2' : theme.rules.find(
  //   (rule) => rule.token === tokenType
  // )?.foreground || "272822";
  const foreground = theme.rules.find(
    (rule) => {
      // Handle function identifiers specially
      if (tokenType === 'identifier' && character.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
        return rule.token === 'function';
      }
      return rule.token === tokenType;
    }
  )?.foreground || "f8f8f2";
  const background = theme.rules.find(
    (rule) => rule.token === tokenType
  )?.background;
  
  return {
    token: tokenType,
    foreground: `#${foreground}`,
    background: `#${background}`,
  };
};
