import { useRef } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  FormInstance,
  Input,
  Spin,
  message,
} from "antd";

import bg from "./assets/bg.png";
import { useRegisterEmail } from "./mutations/useRegisterEmail";
import { WebShare } from "./components/WebShare";

function App() {
  const form = useRef<FormInstance<any>>(null);

  const onError: any = () => {
    form.current?.resetFields();
  };

  const lookup$ = useRegisterEmail({
    onError,
    onSuccess: (data: any) => {
      console.log(data);
      if (data.payment) {
        // setTimeout(() => window.location.replace(data.payment), 10 * 1000);
      }
    },
  });

  const onSubmit = async (values: any) => lookup$.mutate(values);
  const onShare = () => {
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: window.location.href,
          title: "Hey, check this out!",
          text: `I'm using coolest email address - ${lookup$.variables?.alias}@gachi.me`,
        })
        .then(() => console.log("Shareing successfull"))
        .catch((err) => console.log("Sharing failed", err));
    }
  };

  const text = `Hey, check this out!\nI'm using coolest email address - ${lookup$.variables?.alias}@gachi.me. You can do it on https://gachi.me`;

  return (
    <>
      <div
        className="w-screen h-screen flex flex-col items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div style={{ maxWidth: "450px", width: "100%" }}>
          <Card bordered className="shadow-xl mx-3">
            <Spin spinning={lookup$.isLoading}>
              {lookup$.isSuccess && (
                <>
                  <Alert
                    type="success"
                    message="Success"
                    className="text-xs"
                    description={
                      <>
                        <p>
                          Email address available for registration. Please
                          approve mail forwarding - you'll receive confirmation
                          message to original email address.
                        </p>
                      </>
                    }
                  />
                  {!!navigator.share ? (
                    <div className="text-center mt-5">
                      <Button onClick={onShare} className="mb-3">
                        Share your new email{" "}
                        {lookup$.variables?.alias || "example"}@gachi.me
                      </Button>

                      <div className="text-center">
                        <WebShare />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mt-5 mb-3 text-right">
                        <Input.TextArea
                          value={text}
                          autoSize
                          className="text-xs mb-1"
                        />
                        <Button size="small" onClick={() => {
                          navigator.clipboard.writeText(text);
                          message.success("Copied");
                        }}>Copy</Button>
                      </div>

                      <div className="text-center">
                        <WebShare />
                      </div>
                    </>
                  )}
                </>
              )}
              {lookup$.isError && (
                <Alert
                  type="error"
                  className="mb-5 text-xs"
                  message="Whoops..."
                  description={
                    <>
                      <p>
                        This email address may already taken or we have some
                        problems with API. Please try later or{" "}
                        <a
                          href="mailto:master@gachi.me"
                          className="underline hover:text-white hover:underline"
                        >
                          email me
                        </a>
                      </p>
                    </>
                  }
                />
              )}
              <Form
                style={{
                  display: !lookup$.isSuccess ? "block" : "none",
                }}
                disabled={lookup$.isLoading}
                ref={form}
                onFinish={onSubmit}
                size="large"
                layout="vertical"
              >
                <Form.Item
                  name="alias"
                  rules={[{ required: true }]}
                  className="mb-0"
                >
                  <Input
                    autoFocus
                    addonAfter="@gachi.me"
                    placeholder="your-name"
                  />
                </Form.Item>
                <Divider>forwarding to</Divider>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true },
                    {
                      type: "email",
                      message: "Please enter valid email address",
                    },
                  ]}
                >
                  <Input placeholder="your-email@example.com" />
                </Form.Item>
                <Form.Item className="text-center">
                  <Button htmlType="submit">Check availability</Button>
                </Form.Item>

                {/* <p className="text-gray-400 mb-2" style={{ fontSize: "10px" }}>
                  <span>
                    * $15/year - paid in crypto. Payment processed by{" "}
                    <a href="https://nowpayments.io" className="underline hover:text-white hover:underline">
                      NowPayments.io
                    </a>
                  </span>
                </p> */}

                <p
                  className="text-gray-400 text-center"
                  style={{ fontSize: "10px" }}
                >
                  <span>
                    * emails sent to{" "}
                    <span className="font-semibold">[alias]@gachi.me</span> will
                    forwarded to your 'boring email'
                  </span>
                </p>

                <div className="mt-3 text-center">
                  <WebShare />
                </div>
                <p
                  className="text-gray-400 text-center mt-3"
                  style={{ fontSize: "15px" }}
                >
                  <span>
                    <a
                      href="mailto:master@gachi.me"
                      className="underline hover:text-white hover:underline"
                    >
                      Support
                    </a>
                  </span>
                  {" | "}
                  <span>
                    <a
                      href="https://nowpayments.io/donation/gachime"
                      className="underline hover:text-white hover:underline"
                    >
                      Donations
                    </a>
                  </span>
                </p>
              </Form>
            </Spin>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
