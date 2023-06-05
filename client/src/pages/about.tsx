import { Footer, Header } from '@/components'
import React from 'react'

export default () => {
  return (
    <main>
      <div className="w-full flex justify-center">
        <Header home={true} create={true} search={true} />
      </div>
      <section className="w-full flex flex-col items-center justify-center">
        <article className="mt-16 text-lg mx-16 flex flex-col max-w-5xl gap-16 pb-16 text-center">
          <h1>
            About <span className="text-blue-400 text-xl">[Crown]</span>
          </h1>

          <p>
            Welcome to Crown! This is a demonstration of a fullstack application. Feel free to look
            around and get yourself situated and one of our staff will take a look at your request.
            Just kidding there is no one here and I have been told that if I keep making those jokes
            then I will be viewed as a psychotic with awareness issues.
          </p>

          <p>
            Our journey began when I was laid off from work for unrightly reasons but I won't get
            into that because I still need to get another job. Since then, I have been on a bored
            out of my mind trying to figure out how to finish the 'Great Escape'. With a diverse
            team of experts in astrophysics, economics, etc., we collaborate to bring innovative
            solutions and exceptional experiences to our valued customers/clients. Aka recode the
            discord project because I forgot all my old skills and had to relearn but at this point
            I am good as new. [Until I take another break and then never remember anything else ever
            again...]
          </p>

          <p>
            At [Crown], we firmly believe in getting paid as money is insane. I just want to say,
            right after the Miami Heat beat the Sixers in 2023 NBA Playoffs, I got a betting notice
            for an insane multiplier. $1,250 for a $20,000 win if they win the 2023 Championships.
            If they didn't treat me unfairly and didn't fire me then I would have had the money to
            make that bet and they beat the Celtics and so far 1-1 tied against the Nuggets. I had
            the chance to make $20k. Whether it's through sports, music, games, when the inner child
            is calling the father mustn't abandon those we cherish.
          </p>

          <p>
            What sets us apart is our unwavering commitment to cause drama. We take pride in
            exploiting users for their general income. Our government takes ~25% of your annual
            income. Yet they have no impact in helping you find a job and I didn't even get
            unemployment benefits. They never helped me learn how to code, never helped me interview
            and never did any of my job. They should be doing at least 20% if not the full 25. If
            you worked for 3 years you get taxed an entire years worth of income. That is more than
            enough to feed families. However, where is the money going towards? Not the wallet(s) it
            should be heading to thats for sure. Where is the customer satisfaction then America?
          </p>

          <p>
            But we don't just stop there. [Crown] is dedicated to helping you copy and recreate your
            own full stack application because you probably have a million dollar app idea and I
            unfortunately can't remember what I had for breakfast. Strive for positivity and excute
            in motion to the point that I have no idea what I am saying anymore but when I stop and
            think about that thing that I never thought about before and start claming it as my own
            after I realize the success beyond measurements from such a standpoint that I (Thomas
            Grant) has provided the initial prospect, the flower before the dawn.
          </p>

          <p>
            We invite you to join us on this exciting journey. Whether you are a customer, partner,
            or simply someone interested in our work, we value your support and look forward to
            satisfying your desires.
          </p>

          <p>Thank you for visiting [Crown]. Together, let's live like a King!</p>
        </article>
        <Footer />
      </section>
    </main>
  )
}
