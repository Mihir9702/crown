import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Reply } from './Reply'
import { Posties } from '../types'

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

  @Column()
  postId!: number

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  tag!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  pinned?: boolean

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  likes!: number

  // @OneToMany(() => Reply, reply => reply.postId)
  @Field(() => Reply, { nullable: true })
  @Column('text', { array: true, nullable: true })
  replies: Reply[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
