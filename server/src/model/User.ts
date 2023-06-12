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
  @Column({ type: 'text' })
  nameid!: string

  @Field(() => Number)
  @Column({ unique: true })
  userid!: number

  @Field({ defaultValue: process.env.DEFAULT_IMG, nullable: true })
  @Column({ default: process.env.DEFAULT_IMG, nullable: true })
  photoid!: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  bio?: string

  @Field(() => Number, { defaultValue: 0 })
  @Column({ default: 0 })
  likes!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()

  async getPosts() {
    return await Post.find({ where: { owner: this.nameid } })
  }

  async getLiked() {
    return await (await Post.find()).map(p => p.likes?.includes(this.userid))
  }
}
