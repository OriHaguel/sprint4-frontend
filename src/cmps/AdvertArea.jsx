import React from 'react'

export function AdvertArea() {


    return (
        <div className="advert-container">
            <div className="text-content">
                <p>A whole world of freelance talent at your fingertips</p>
                <p>Get results from skilled freelancers from all over the world, for every task, at any price point.</p>
                <p>Pay per project or by the hour (Pro). Payments only get released when you approve.</p>
                <p>Filter to find the right freelancers quickly and get great work delivered in no time, every time.</p>
                <p>Chat with our team to get your questions answered or resolve any issues with your orders.</p>
            </div>
            <div className="advert-area">
                <iframe
                    style={{ width: '100%', maxWidth: '1200px', height: '600px' }}
                    src="https://streamable.com/e/jsc39n"
                    className="advert-video"
                    frameBorder="0"
                    allowFullScreen
                    title="Advert Video"
                ></iframe>
            </div>
            <div>Pro Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, ducimus architecto? Quae mollitia laborum, quia delectus illum libero nostrum ea.</div>
        </div>
    )
}
