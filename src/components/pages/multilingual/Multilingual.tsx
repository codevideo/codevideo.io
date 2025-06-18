import React, { useState, useRef } from 'react'
import { Container, Flex, Heading, Text, Box, Section, Grid, Card, Badge, Button, Link, Code } from '@radix-ui/themes'
import { PlayIcon } from '@radix-ui/react-icons'
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useAppSelector } from '../../../hooks/useAppSelector';

const languages = [
  {
    name: 'English',
    code: 'en',
    flags: ['🇺🇸', '🇬🇧'],
    videoPath: '/video/multilingual/english.mp4',
    color: 'blue'
  },
  {
    name: 'German',
    code: 'de', 
    flags: ['🇩🇪', '🇨🇭', '🇦🇹'],
    videoPath: '/video/multilingual/german.mp4',
    color: 'orange'
  },
  {
    name: 'Mandarin',
    code: 'zh',
    flags: ['🇨🇳'], 
    videoPath: '/video/multilingual/mandarin.mp4',
    color: 'red'
  },
  {
    name: 'Portuguese',
    code: 'pt',
    flags: ['🇧🇷', '🇵🇹'],
    videoPath: '/video/multilingual/portuguese.mp4', 
    color: 'green'
  },
  {
    name: 'Spanish',
    code: 'es',
    flags: ['🇪🇸', '🇲🇽', '🇦🇷'],
    videoPath: '/video/multilingual/spanish.mp4',
    color: 'purple'
  }
]

const code = `[
  {
    "name": "author-speak-before",
    "value": "This lesson is to show how quickly we can convert CodeVideo videos into different languages! As an example, we'll be learning about for loops in python."
  },
  {
    "name": "author-speak-before",
    "value": "First, let's create and open a main.py file."
  },
  {
    "name": "mouse-move-file-explorer",
    "value": "1"
  },
  {
    "name": "mouse-right-click",
    "value": "1"
  },
  {
    "name": "mouse-move-file-explorer-context-menu-new-file",
    "value": "1"
  },
  {
    "name": "mouse-left-click",
    "value": "1"
  },
  {
    "name": "file-explorer-type-new-file-input",
    "value": "main.py"
  },
  {
    "name": "file-explorer-enter-new-file-input",
    "value": "1"
  },
  {
    "name": "editor-type",
    "value": "# We'll print \"Hello, World!\" five times using a for loop\n"
  },
  {
    "name": "editor-type",
    "value": "for i in range(5):"
  },
  {
    "name": "author-speak-before",
    "value": "We use the 'for i in range' pattern. And in this case, since we want to loop 5 times, we call range 5"
  },
  {
    "name": "author-speak-before",
    "value": "Now, let's print out 'Hello world' using the print function. "
  },
  {
    "name": "editor-type",
    "value": "\n    print(\"Hello, World!\")"
  },
  {
    "name": "author-speak-before",
    "value": "Let's open up a terminal now and run this script."
  },
  {
    "name": "terminal-open",
    "value": "1"
  },
  {
    "name": "terminal-type",
    "value": "python main.py"
  },
  {
    "name": "terminal-enter",
    "value": "1"
  },
  {
    "name": "terminal-set-output",
    "value": "Hello, world!\nHello, world!\nHello, world!\nHello, world!\nHello, world!"
  },
  {
    "name": "terminal-enter",
    "value": "1"
  },
  {
    "name": "author-speak-before",
    "value": "Perfect! That's how you can write for loops in Python."
  }
]`

interface VideoOverlayProps {
  isVisible: boolean;
  onPlay: () => void;
  flags: string[];
  languageName: string;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ isVisible, onPlay, flags, languageName }) => {
  if (!isVisible) return null;

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background 0.2s ease'
      }}
      onClick={onPlay}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.4)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.6)'
      }}
    >
      <Flex direction="column" align="center" gap="3">
        <Box
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--mint-9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease'
          }}
        >
          <PlayIcon width="24" height="24" color="white" />
        </Box>
        <Text size="4" weight="bold" style={{ color: 'white' }}>
          {flags.join(' ')} Play {languageName}
        </Text>
      </Flex>
    </Box>
  )
}

export default function Multilingual() {
    const { theme } = useAppSelector((state) => state.editor);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set())
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleOnMount = (
    _editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = _editor;



    // also run the tokenizer once because it doesn't work the first time
    // (this is a hacky solution - note that we need to access the window version of monaco
    // AND we need the timeout!!!! otherwise the tokenizer won't work at all!
    // IN OTHER WORDS DO NOT DELETE THIS BLOCK:
    if (typeof window !== "undefined") {
      setTimeout(() => {
        (window as any).monaco.editor.tokenize(
          `export const dummyFunction = () => {
        console.log('hello world')
      }`,
          "typescript"
        );
      }, 1000);
    }

    // Force tokenization refresh
    if (typeof window !== "undefined") {
      setTimeout(() => {
        editorRef?.current?.trigger('source', 'editor.action.forceRetokenize', {});
      }, 100);
    }
  };

  const handlePlay = (languageCode: string) => {
    setPlayingVideos(prev => new Set([...prev, languageCode]))
    // Play the video after showing controls
    setTimeout(() => {
      const video = videoRefs.current[languageCode]
      if (video) {
        video.play()
      }
    }, 100)
  }

  const handleVideoClick = (languageCode: string) => {
    const video = videoRefs.current[languageCode]
    if (video) {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
  }

  return (
    <Container size="4" py="9" mt="9">
      <Section size="3">
        <Flex direction="column" align="center" justify="center" gap="6">
          
          {/* Header */}
          <Box style={{ textAlign: 'center', maxWidth: '800px' }}>
            <Heading size="9" mb="4">
              Multilingual Functionality
            </Heading>
            <Text size="5" color="gray" mb="6">
              Experience CodeVideo's powerful multilingual capabilities. The same Python lesson automatically 
              generated in five different languages with native pronunciation.
            </Text>
            <Box
              style={{
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 'var(--radius-4)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}
            >
              <Text size="3" weight="bold">
                🌍 One lesson, five languages, infinite possibilities
              </Text>
            </Box>
            <Text size="3" color="gray" style={{ maxWidth: '700px' }}>
              Each video demonstrates the same Python lesson describing how for loops work. Starting from the English-based CodeVideo actions, we can generate  
              the same lesson in a variety of languages with a single click.
            </Text>
          </Box>

          {/* Video Grid */}
          <Box style={{ width: '100%' }}>
            <Grid 
              columns={{ initial: "1", sm: "2", lg: "3" }} 
              gap="6"
              style={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                justifyItems: 'center'
              }}
            >
              {languages.map((language) => {
                const isPlaying = playingVideos.has(language.code)
                
                return (
                  <Card key={language.code} style={{ 
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '350px'
                  }}>
                    <Flex direction="column" gap="3">
                      
                      {/* Language Header */}
                      <Flex align="center" justify="between" p="3" pb="0">
                        <Flex align="center" gap="2">
                          <Text size="4">{language.flags.join(' ')}</Text>
                          <Heading size="4">{language.name}</Heading>
                        </Flex>
                        <Badge color={language.color as any} variant="soft">
                          Native Voice
                        </Badge>
                      </Flex>

                      {/* Video Container */}
                      <Box style={{ position: 'relative', aspectRatio: '16/9' }}>
                        <video 
                          ref={(el) => {
                            videoRefs.current[language.code] = el
                          }}
                          src={language.videoPath}
                          controls={isPlaying}
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            borderRadius: '6px',
                            cursor: isPlaying ? 'pointer' : 'default'
                          }}
                          onClick={() => isPlaying && handleVideoClick(language.code)}
                          onLoadedData={() => {
                            // Ensure video is ready for playback
                            const video = videoRefs.current[language.code]
                            if (video) {
                              video.currentTime = 0
                            }
                          }}
                        />
                        
                        <VideoOverlay 
                          isVisible={!isPlaying}
                          onPlay={() => handlePlay(language.code)}
                          flags={language.flags}
                          languageName={language.name}
                        />
                      </Box>

                    </Flex>
                  </Card>
                )
              })}
            </Grid>
          </Box>

          {/* Feature Highlights */}
          <Section size="2" mt="8">
            <Box style={{ textAlign: 'center', maxWidth: '800px' }}>
              <Heading size="6" mb="4">Key Multilingual Features</Heading>
              <Grid columns={{ initial: "1", sm: "2" }} gap="4">
                <Card>
                  <Flex direction="column" gap="2" p="4">
                    <Text size="3" weight="bold">🎙️ Native Pronunciation</Text>
                    <Text size="2" color="gray">
                      Each video features authentic native speaker pronunciation with 
                      proper intonation and rhythm for natural learning.
                    </Text>
                  </Flex>
                </Card>
                <Card>
                  <Flex direction="column" gap="2" p="4">
                    <Text size="3" weight="bold">🌐 Cultural Context</Text>
                    <Text size="2" color="gray">
                      Examples and explanations are adapted for each culture, 
                      making content more relatable and easier to understand.
                    </Text>
                  </Flex>
                </Card>
                <Card>
                  <Flex direction="column" gap="2" p="4">
                    <Text size="3" weight="bold">⚡ Single Source</Text>
                    <Text size="2" color="gray">
                      Create once in your preferred language, then automatically 
                      generate versions in any supported language.
                    </Text>
                  </Flex>
                </Card>
                <Card>
                  <Flex direction="column" gap="2" p="4">
                    <Text size="3" weight="bold">🎯 Perfect Synchronization</Text>
                    <Text size="2" color="gray">
                      Code timing, animations, and narration are perfectly 
                      synchronized across all language versions.
                    </Text>
                  </Flex>
                </Card>
              </Grid>
            </Box>
          </Section>

          {/* Expandable Code of source actions */}
          <Section size="2" mt="8">
            <Box >
              <Heading size="6" mb="4">Source Actions</Heading>
              <Text size="3" color="gray" mb="4">
                The Python lessons are created using the following source CodeVideo actions in English:
              </Text>
              <Box>
                <Editor
                        theme={theme === "light" ? "vs" : "vs-dark"}
                        path="areEqual.ts"
                        width={"100%"}
                        height={"300px"}
                        defaultLanguage="typescript"
                        language="typescript"
                        value={code}
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontFamily: "Fira Code",
                          fontSize: 13,
                          fontLigatures: true,
                          lineNumbers: "off",
                          folding: true,
                          automaticLayout: true,
                          autoIndent: "full",
                          readOnly: true
                        }}
                        onMount={handleOnMount}
                      />
              </Box>
            </Box>
          </Section>

          {/* Call to Action */}
          <Section size="2">
            <Flex direction="column" align="center" gap="4" style={{ textAlign: 'center' }}>
              <Heading size="5">Ready to Create Multilingual Content?</Heading>
              <Text size="3" color="gray" style={{ maxWidth: '600px' }}>
                Expand your reach and create educational content that speaks to learners 
                around the world in their native language.
              </Text>
              <Link href="https://studio.codevideo.io" style={{ cursor: 'pointer' }}>
                <Button size="4" style={{ cursor: 'pointer' }}>Start Creating Multilingual Videos</Button>
              </Link>
            </Flex>
          </Section>
        </Flex>
      </Section>
    </Container>
  )
}
