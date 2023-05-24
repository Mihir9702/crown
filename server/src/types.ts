import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import { Field, InputType } from 'type-graphql'

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userid?: number }
  }
  res: Response
}

@InputType()
export class Input {
  @Field()
  username!: string

  @Field({ nullable: true })
  nameid?: string

  @Field()
  password!: string
}

@InputType()
export class Create {
  @Field()
  header!: string

  @Field()
  content!: string
}

@InputType()
export class Update {
  @Field()
  postid!: number

  @Field()
  header!: string
}

@InputType()
export class Delete {
  @Field()
  nameid!: string

  @Field()
  postid!: number
}
