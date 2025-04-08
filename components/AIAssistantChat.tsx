import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  TextInput, 
  ScrollView, 
  Keyboard, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';
import { useTheme } from '@/contexts/ThemeContext';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantChatProps {
  currentScreen?: string;
  currentContext?: string;
}

const { width, height } = Dimensions.get('window');
const GEMINI_API_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY || '';

const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ 
  // need to change to the actual screen name and context
  // for example: currentScreen = 'Algoritmos de Busca', currentContext = 'Busca binária'
  currentScreen = 'Página inicial', 
  currentContext = 'Visualizador de algoritmos'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Olá! Sou o assistente de algoritmos do AlgoView. Como posso ajudar você a entender melhor os algoritmos?', 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();
  
  const panelScaleX = useRef(new Animated.Value(0)).current;
  const panelScaleY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  
  const bgColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#121212';
  const accentColor = '#4F46E5';
  const inputBgColor = isDarkMode ? '#2D2D2D' : '#F5F5F5';
  const borderColor = isDarkMode ? '#383838' : '#E5E7EB';
  const bubbleUserBg = accentColor;
  const bubbleBotBg = isDarkMode ? '#383838' : '#F3F4F6';

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(panelScaleX, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(panelScaleY, {
          toValue: 1, 
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(panelScaleX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(panelScaleY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 200,
          delay: 150,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 200,
          delay: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  // Auto-rolagem para mensagens novas
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const toggleChatPanel = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    Keyboard.dismiss();
    
    try {
      const prompt = `
        Você é um assistente de IA especializado em algoritmos e estruturas de dados.
        O usuário está na tela "${currentScreen}" do aplicativo AlgoView, que é um visualizador interativo de algoritmos.
        Contexto adicional: ${currentContext}

        Regras importantes:
        1. Responda apenas perguntas relacionadas a algoritmos, estruturas de dados, linguagens de programação e tópicos acerca de programação.
        2. Se a pergunta não for sobre esses tópicos, responda educadamente que você só pode ajudar com temas de programação e algoritmos.
        3. Não forneça informações sobre o aplicativo AlgoView, além do que possa ser visto nas telas.
        4. Seja conciso e direto nas explicações.
        5. Use linguagem simples e exemplos quando possível.
        6. Quando explicar complexidade, use a notação Big O.
        7. Tente limitar as respostas para a menor quantidade de tokens possível.
        8. Não utilize emojis ou formatação de texto.
        9. Não forneça links externos ou referências a outros sites.
        10. Não forneça informações pessoais ou confidenciais.
        11. Não faça suposições sobre o conhecimento do usuário, mantenha um tom neutro e acessível.

        Pergunta do usuário: ${inputText}
      `;

      const response = await fetchGeminiResponse(prompt);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, tive um problema ao processar sua pergunta. Poderia tentar novamente?",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Olá! Sou o assistente de algoritmos do AlgoView. Como posso ajudar você a entender melhor os algoritmos?',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const fetchGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      
      if (!GEMINI_API_KEY) {
        throw new Error("Chave de API do Gemini não encontrada");
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const data = await response;
      
      console.log('Resposta da API do Gemini:', data);  

      if (!response) {
        console.error('Erro na API do Gemini:', data);
        return "Desculpe, tive um problema ao processar sua pergunta. Por favor, tente novamente mais tarde.";
      }

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "Não consegui gerar uma resposta adequada. Por favor, tente reformular sua pergunta.";
      }
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      return "Ocorreu um erro na comunicação com o assistente. Por favor, verifique sua conexão e tente novamente.";
    }
  };

  const chatPanelWidth = Math.min(400, width * 0.9);
  const chatPanelHeight = Math.min(500, height * 0.7);

  return (
    <View style={styles.container}>
      {/* Painel de chat expandido */}
      <Animated.View 
        style={[
          styles.chatPanel, 
          { 
            width: chatPanelWidth,
            height: chatPanelHeight,
            backgroundColor: bgColor,
            borderColor: borderColor,
            transform: [
              { scale: panelScaleX },
              { translateY: panelScaleY.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
              })}
            ],
            opacity: panelScaleX,
            display: isOpen ? 'flex' : 'none'
          }
        ]}
      >
        <View style={[styles.chatHeader, { borderBottomColor: borderColor }]}>
          <View style={styles.headerContent}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: '#4CAF50' }
            ]} />
            <Text style={[
              styles.chatTitle,
              { color: textColor }
            ]}>
              Assistente AlgoView
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              onPress={clearChat} 
              style={styles.clearButton}
            >
              <Ionicons name="trash-outline" size={20} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={toggleChatPanel}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color={textColor} />
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={true}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.botMessageWrapper
              ]}
            >
              <View 
                style={[
                  styles.messageBubble,
                  message.isUser 
                    ? [styles.userMessage, { backgroundColor: bubbleUserBg }] 
                    : [styles.botMessage, { backgroundColor: bubbleBotBg }]
                ]}
              >
                <Text 
                  style={[
                    styles.messageText,
                    { color: message.isUser ? '#FFFFFF' : textColor }
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
          
          {isLoading && (
            <View style={[
              styles.messageBubble,
              styles.botMessage,
              { backgroundColor: bubbleBotBg }
            ]}>
              <ActivityIndicator size="small" color={accentColor} />
            </View>
          )}
        </ScrollView>
        
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={[
            styles.inputContainer,
            { borderTopColor: borderColor }
          ]}>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: inputBgColor,
                  color: textColor,
                }
              ]}
              placeholder="Pergunte sobre algoritmos..."
              placeholderTextColor={isDarkMode ? '#999999' : '#999999'}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? accentColor : isDarkMode ? '#333333' : '#DDDDDD' }
              ]}
              onPress={sendMessage}
              disabled={inputText.trim() === '' || isLoading}
            >
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
      
      {/* Botão flutuante */}
      <Animated.View
        style={[
          styles.floatingButtonContainer,
          {
            transform: [{ scale: buttonScale }],
            opacity: buttonOpacity,
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.floatingButton,
            { backgroundColor: accentColor }
          ]}
          onPress={toggleChatPanel}
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble-ellipses" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    alignItems: 'flex-end',
  },
  floatingButtonContainer: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  chatPanel: {
    position: 'absolute',
    bottom: 75,
    right: 0,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  chatTitle: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    marginRight: 12,
    padding: 4,
    borderRadius: 20,
  },
  closeButton: {
    padding: 4,
    borderRadius: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 12,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  botMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userMessage: {
    borderBottomRightRadius: 4,
  },
  botMessage: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default AIAssistantChat;