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

import { Post } from './Post'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  username!: string

  @Field(() => String)
  @Column({ type: 'text' })
  password!: string

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  nameid!: string

  @Field(() => Number)
  @Column({ unique: true })
  userid!: number

  @Field({
    defaultValue: 'https://upcdn.io/12a1yGp/raw/default/id.png',
    nullable: true,
  })
  @Column({
    default: 'https://upcdn.io/12a1yGp/raw/default/id.png',
    nullable: true,
  })
  photoid!: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  bio?: string

  @Field(() => Number, { defaultValue: 0 })
  @Column({ default: 0 })
  likes!: number

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, post => post.owner)
  posts?: Post[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
