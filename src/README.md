## 🛠️ **Tecnologias Utilizadas**

O projeto foi desenvolvido utilizando ferramentas modernas que tornam o desenvolvimento mais rápido, seguro e organizado:

### **📱 React Native**
Framework principal usado para construir a interface e funcionalidades do aplicativo utilizando JavaScript.

### **📱 Expo Go**
Aplicativo utilizado durante o desenvolvimento para testar rapidamente o projeto em dispositivos móveis, garantindo um fluxo de trabalho mais ágil.

### **🔥 Firebase**
Utilizado para autenticação de usuários e armazenamento das listas no Firestore, garantindo segurança e persistência dos dados.

### **💾 AsyncStorage**
Responsável por armazenar informações simples diretamente no dispositivo, como dados de sessão e preferências temporárias.

### **📂 JavaScript**
Linguagem principal utilizada na construção de telas, lógica do app e integração com serviços externos.

---

## 🔥 **Integração com Firebase**

O projeto conta com integração ao **Firebase**, utilizada para garantir mais segurança e praticidade ao usuário. As funcionalidades configuradas são:

### **🔐 Authentication**
Usada para login e cadastro de usuários com **e-mail e senha**, permitindo que cada pessoa tenha acesso seguro às suas próprias listas.

### **🗂️ Firestore Database**
Responsável por **salvar, carregar e atualizar** as listas de compras.  
O Firestore permite armazenamento dinâmico e sincronizado, garantindo que os dados estejam sempre disponíveis.

### **⚙️ Configuração**
A inicialização do Firebase foi feita através de um arquivo de configuração dedicado no projeto, utilizando as credenciais fornecidas pelo Firebase.

### **📌 Status**
Toda a integração está **funcionando corretamente**, permitindo:
- Criar e autenticar usuários  
- Salvar listas no Firestore  
- Buscar e atualizar dados sem erros

---

## 📦 **Como Executar o Projeto**
```bash
# Clone este repositório
git clone https://github.com/SEU-USUARIO/foodlist.git

# Acesse a pasta do projeto
cd foodlist

# Instale as dependências
npm install

# Rode o projeto
npm start
