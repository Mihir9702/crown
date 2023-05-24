import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types'
import { User } from '../model/User'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userid) {
    if (context.req.path !== '/') {
      console.log(
        '[isAuth] - User not authenticated for request - ',
        context.req.path
      )
    }

    throw new Error('Not Authenticated')
  }

  const user = await User.findOne({
    where: { userid: context.req.session.userid },
  })

  if (!user) {
    console.log(
      '[isAuth] - User not not found for id - ',
      context.req.session.userid
    )
    throw new Error('Not Authenticated')
  }

  context.res.locals.user = user

  return next()
}
