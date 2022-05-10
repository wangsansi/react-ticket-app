import React, { useRef, useState,useEffect } from 'react';
import { TimeFilledIcon } from 'tdesign-icons-react';
import './user.css'

export default function Status() {
    return (
        <div className="ti-login-wrapper">
            <div className="ti-status-content">
                <TimeFilledIcon size='large'/>
                <p>审核中</p>
                <p>请耐心等待</p>
            </div>
        </div>
    )
}