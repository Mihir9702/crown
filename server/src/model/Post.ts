import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import { User } from './User'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ type: 'text' })
  header!: string

  @Field()
  @Column({ type: 'text' })
  content!: string

  @Field()
  @Column({ type: 'text' })
  owner!: string

  @Field({ nullable: true, defaultValue: false })
  @Column({ nullable: true, default: false })
  pinned?: boolean

  @Field(() => [User])
  @OneToMany(() => User, user => user.userid)
  likes!: number[]

  @Field()
  @Column()
  postid!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
