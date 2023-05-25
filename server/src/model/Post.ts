import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
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

  @Field(() => [Number], { nullable: true })
  @OneToMany(() => User, user => user.userid, { nullable: true })
  @JoinColumn()
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
