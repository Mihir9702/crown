import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({ type: 'text' })
  content!: string

  @Field(() => String)
  @Column({ type: 'text' })
  owner!: string

  @Field(() => Number)
  @Column()
  postid!: number

  @Field(() => [Number], { nullable: true })
  @Column('text', { array: true, nullable: true })
  likes?: number[]

  @Field(() => Number)
  @Column()
  commentid!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
