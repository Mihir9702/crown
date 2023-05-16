import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { Reply } from './Reply'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ type: 'text' })
  username!: string

  @Field()
  @Column({ type: 'text' })
  password!: string

  @Field()
  @Column({ type: 'text' })
  displayName!: string

  @Field()
  @Column({ type: 'boolean' })
  status!: boolean

  @Field()
  @Column({ type: 'text' })
  pfp?: string

  @Field()
  @Column({ type: 'text' })
  shoes?: string

  @Field()
  @Column()
  posts?: Post[]

  @Field()
  @Column()
  replies?: Reply[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
