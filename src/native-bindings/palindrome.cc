#include <nan.h>

using namespace v8;

void IsPalindrome(const FunctionCallbackInfo<Value>& info) {
  Nan::Utf8String arg0(info[0]);
  char *str = *arg0;
  size_t len = arg0.length();
  int half = len / 2;
  int start = 0;
  int end = len - 1;
  int space = 32;
  int comma = 44;
  bool isPal = true;
  bool startSpace;
  bool endSpace;

  while (half > 0 && isPal) {
    startSpace = str[start] == space || str[start] == comma;
    endSpace = str[end] == space || str[end] == comma;

    if (str[start] == str[end]) {
      start++;
      end--;
    } else if (startSpace || endSpace) {
      startSpace && start++;
      endSpace && end--;
    } else {
      isPal = false;
    }

    half--;
  }

  info.GetReturnValue().Set(isPal);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", IsPalindrome);
}

NODE_MODULE(addon, Init)