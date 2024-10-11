// global.d.ts
interface TelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
  }
  
  interface TelegramInitDataUnsafe {
    user: TelegramUser;
  }
  
  interface TelegramWebApp {
    initDataUnsafe: TelegramInitDataUnsafe;
    // Add other properties or methods as needed
  }
  