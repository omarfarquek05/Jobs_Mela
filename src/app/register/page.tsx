"use client"

import React from 'react'
import { Button, Form, Radio, message } from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";


const Register = () => {

  const dispatch = useDispatch(); 
  const router = useRouter();

    const onFinish = async (values: any)=> {
             try {
                 dispatch(SetLoading(true));
                 const response = await axios.post("/api/users/register", values );
                  message.success(response.data.message);
                  router.push("/login");

             } catch (error: any) {
               message.error(error.response.data.message || "register failed");
             }
             finally {
              dispatch(SetLoading(false));
            }
    };

  return (
     <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-450">
        <h1 className="text-xl">Jobs_Mela Register</h1>
        <hr />

        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label="Register As" name="userType">
            <Radio.Group>
              <Radio value="employer">Company</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <input type="text" className="input" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <Link href="/login">Already have an account? Login</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register