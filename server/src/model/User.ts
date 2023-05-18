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

  @Field({ nullable: true })
  @Column({ nullable: true })
  pfp?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  shoes?: string

  // @OneToMany(() => Post, post => post.postId)
  @Field(() => Post, { nullable: true })
  @Column('text', { array: true, nullable: true })
  posts?: Post[]

  // @OneToMany(() => Reply, reply => reply.displayName)
  @Field(() => Reply, { nullable: true })
  @Column('text', { array: true, nullable: true })
  replies?: Reply[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
