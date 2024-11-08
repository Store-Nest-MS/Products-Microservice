import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Logger,
  BadRequestException,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { ProductsArrayDto } from './dto/seedProducts';
import { unknown } from 'zod';
import { PaginationDTO } from 'src/common/dtos';

const h = {
  products: [
    {
      name: 'Information Week',
      price: 617.09,
      createdAt: '2024-03-04T03:04:28',
      updatedAt: '2024-01-08T22:57:41.042757',
    },
    {
      name: 'Office Level',
      price: 936.31,
      createdAt: '2024-03-24T07:19:35',
      updatedAt: '2023-12-03T22:57:41.042814',
    },
    {
      name: 'Decade Job',
      price: 469.75,
      createdAt: '2024-07-09T04:31:05',
      updatedAt: '2024-05-03T22:57:41.042863',
    },
    {
      name: 'Live Also',
      price: 960.6,
      createdAt: '2024-09-05T20:25:06',
      updatedAt: '2024-04-14T22:57:41.042919',
    },
    {
      name: 'Moment Worker',
      price: 874.91,
      createdAt: '2024-06-02T04:49:37',
      updatedAt: '2024-07-23T22:57:41.042966',
    },
    {
      name: 'Know Our',
      price: 437.06,
      createdAt: '2024-03-29T21:30:55',
      updatedAt: '2023-11-12T22:57:41.043017',
    },
    {
      name: 'Always Something',
      price: 429.04,
      createdAt: '2024-06-08T13:26:48',
      updatedAt: '2024-08-31T22:57:41.043058',
    },
    {
      name: 'Environmental Without',
      price: 622.65,
      createdAt: '2024-08-18T14:13:51',
      updatedAt: '2024-08-20T22:57:41.043122',
    },
    {
      name: 'Beat Nothing',
      price: 309.18,
      createdAt: '2024-07-14T16:18:25',
      updatedAt: '2023-12-27T22:57:41.043163',
    },
    {
      name: 'Page Than',
      price: 880.58,
      createdAt: '2024-02-28T17:56:16',
      updatedAt: '2024-09-07T22:57:41.043200',
    },
    {
      name: 'Reason Car',
      price: 73.27,
      createdAt: '2024-06-29T08:24:50',
      updatedAt: '2023-11-19T22:57:41.043243',
    },
    {
      name: 'Low Security',
      price: 644.24,
      createdAt: '2024-07-07T23:31:19',
      updatedAt: '2024-04-02T22:57:41.043301',
    },
    {
      name: 'Keep Building',
      price: 986.43,
      createdAt: '2024-07-19T07:28:21',
      updatedAt: '2023-10-19T22:57:41.043344',
    },
    {
      name: 'Class Low',
      price: 192.74,
      createdAt: '2024-07-03T03:30:23',
      updatedAt: '2024-04-04T22:57:41.043384',
    },
    {
      name: 'West Structure',
      price: 673.01,
      createdAt: '2024-02-02T15:30:56',
      updatedAt: '2024-06-19T22:57:41.043426',
    },
    {
      name: 'Former Write',
      price: 271.58,
      createdAt: '2024-03-02T09:36:25',
      updatedAt: '2024-01-07T22:57:41.043472',
    },
    {
      name: 'Tree Firm',
      price: 498.77,
      createdAt: '2023-10-27T04:43:57',
      updatedAt: '2024-10-03T22:57:41.043523',
    },
    {
      name: 'Might Pattern',
      price: 635.28,
      createdAt: '2024-03-01T15:09:00',
      updatedAt: '2024-06-05T22:57:41.043562',
    },
    {
      name: 'Miss Begin',
      price: 592.31,
      createdAt: '2024-04-02T21:48:08',
      updatedAt: '2024-08-19T22:57:41.043612',
    },
    {
      name: 'Edge Woman',
      price: 274.89,
      createdAt: '2024-07-01T02:12:44',
      updatedAt: '2023-11-22T22:57:41.043647',
    },
    {
      name: 'Develop Lose',
      price: 649.22,
      createdAt: '2024-09-29T21:23:58',
      updatedAt: '2024-07-01T22:57:41.043680',
    },
    {
      name: 'Crime Physical',
      price: 347.62,
      createdAt: '2023-11-03T10:02:20',
      updatedAt: '2024-03-13T22:57:41.043729',
    },
    {
      name: 'Effect Term',
      price: 475.91,
      createdAt: '2024-04-07T20:40:24',
      updatedAt: '2023-11-17T22:57:41.043774',
    },
    {
      name: 'Sing Kitchen',
      price: 17.91,
      createdAt: '2024-09-29T18:35:58',
      updatedAt: '2024-03-18T22:57:41.043808',
    },
    {
      name: 'Available Foreign',
      price: 877.89,
      createdAt: '2024-06-19T13:40:27',
      updatedAt: '2024-04-12T22:57:41.043853',
    },
    {
      name: 'Chance East',
      price: 685.97,
      createdAt: '2024-02-18T21:24:29',
      updatedAt: '2024-07-16T22:57:41.043888',
    },
    {
      name: 'Reveal Detail',
      price: 303.06,
      createdAt: '2024-07-16T04:41:45',
      updatedAt: '2023-11-10T22:57:41.043921',
    },
    {
      name: 'Prepare Low',
      price: 165.91,
      createdAt: '2024-08-12T03:17:59',
      updatedAt: '2024-09-18T22:57:41.043955',
    },
    {
      name: 'Hotel More',
      price: 448.47,
      createdAt: '2024-08-08T18:42:00',
      updatedAt: '2023-11-18T22:57:41.043987',
    },
    {
      name: 'Window Program',
      price: 705.0,
      createdAt: '2024-01-09T16:12:05',
      updatedAt: '2023-12-26T22:57:41.044022',
    },
    {
      name: 'To Day',
      price: 842.85,
      createdAt: '2024-09-12T05:15:41',
      updatedAt: '2024-01-30T22:57:41.044216',
    },
    {
      name: 'Series Seat',
      price: 435.55,
      createdAt: '2024-03-04T07:20:56',
      updatedAt: '2024-02-09T22:57:41.044257',
    },
    {
      name: 'Concern Against',
      price: 337.24,
      createdAt: '2024-04-04T13:09:13',
      updatedAt: '2024-04-28T22:57:41.044292',
    },
    {
      name: 'Too Career',
      price: 989.36,
      createdAt: '2024-04-04T16:40:49',
      updatedAt: '2024-02-04T22:57:41.044341',
    },
    {
      name: 'Mr Least',
      price: 751.66,
      createdAt: '2024-01-09T06:05:33',
      updatedAt: '2024-09-25T22:57:41.044381',
    },
    {
      name: 'No Through',
      price: 431.59,
      createdAt: '2024-05-25T10:45:13',
      updatedAt: '2024-07-26T22:57:41.044414',
    },
    {
      name: 'How Happy',
      price: 966.81,
      createdAt: '2024-03-12T08:08:39',
      updatedAt: '2024-10-02T22:57:41.044447',
    },
    {
      name: 'Industry Ready',
      price: 715.49,
      createdAt: '2024-04-04T12:41:34',
      updatedAt: '2023-11-23T22:57:41.044480',
    },
    {
      name: 'Fast Cut',
      price: 517.47,
      createdAt: '2024-06-23T06:23:55',
      updatedAt: '2024-04-11T22:57:41.044515',
    },
    {
      name: 'Really Happen',
      price: 976.47,
      createdAt: '2023-10-16T07:37:43',
      updatedAt: '2024-06-13T22:57:41.044565',
    },
    {
      name: 'Meet Able',
      price: 54.84,
      createdAt: '2024-10-06T12:58:13',
      updatedAt: '2024-10-03T22:57:41.044600',
    },
    {
      name: 'As Finish',
      price: 787.01,
      createdAt: '2024-04-21T05:54:12',
      updatedAt: '2023-10-26T22:57:41.044633',
    },
    {
      name: 'Rich Land',
      price: 580.19,
      createdAt: '2024-08-13T13:46:34',
      updatedAt: '2024-01-19T22:57:41.044678',
    },
    {
      name: 'Tell May',
      price: 718.04,
      createdAt: '2024-07-09T13:45:29',
      updatedAt: '2024-09-30T22:57:41.044718',
    },
    {
      name: 'Painting Discussion',
      price: 791.36,
      createdAt: '2024-01-09T06:52:02',
      updatedAt: '2023-11-06T22:57:41.044772',
    },
    {
      name: 'Term The',
      price: 267.92,
      createdAt: '2023-12-19T03:27:53',
      updatedAt: '2024-09-20T22:57:41.044822',
    },
    {
      name: 'Drop Later',
      price: 104.61,
      createdAt: '2023-10-27T09:11:46',
      updatedAt: '2024-06-04T22:57:41.044867',
    },
    {
      name: 'Magazine According',
      price: 772.69,
      createdAt: '2024-02-25T10:11:37',
      updatedAt: '2023-12-21T22:57:41.044905',
    },
    {
      name: 'Agree Work',
      price: 583.34,
      createdAt: '2023-11-17T15:11:19',
      updatedAt: '2023-10-15T22:57:41.044947',
    },
    {
      name: 'End Forward',
      price: 154.4,
      createdAt: '2024-03-21T00:21:25',
      updatedAt: '2023-10-19T22:57:41.044980',
    },
    {
      name: 'Station Evidence',
      price: 713.44,
      createdAt: '2023-10-24T13:27:51',
      updatedAt: '2024-04-03T22:58:38.505628',
    },
    {
      name: 'Occur Environment',
      price: 656.15,
      createdAt: '2023-10-14T09:17:15',
      updatedAt: '2024-09-23T22:58:38.505695',
    },
    {
      name: 'Campaign Or',
      price: 142.74,
      createdAt: '2024-01-17T00:39:28',
      updatedAt: '2024-03-22T22:58:38.505749',
    },
    {
      name: 'Region Activity',
      price: 666.31,
      createdAt: '2024-02-13T09:52:06',
      updatedAt: '2024-06-19T22:58:38.505794',
    },
    {
      name: 'Cultural Mean',
      price: 798.42,
      createdAt: '2024-01-21T00:52:46',
      updatedAt: '2024-06-12T22:58:38.505831',
    },
    {
      name: 'Executive Take',
      price: 854.04,
      createdAt: '2024-07-11T18:55:39',
      updatedAt: '2024-08-08T22:58:38.505886',
    },
    {
      name: 'Identify Artist',
      price: 332.25,
      createdAt: '2024-01-10T09:39:44',
      updatedAt: '2024-09-17T22:58:38.505925',
    },
    {
      name: 'Keep Question',
      price: 383.97,
      createdAt: '2024-05-05T23:10:46',
      updatedAt: '2024-07-30T22:58:38.505964',
    },
    {
      name: 'School Over',
      price: 277.52,
      createdAt: '2024-07-23T20:06:42',
      updatedAt: '2023-12-09T22:58:38.506001',
    },
    {
      name: 'Hour Star',
      price: 328.14,
      createdAt: '2024-06-25T12:23:41',
      updatedAt: '2024-02-13T22:58:38.506039',
    },
    {
      name: 'Produce Action',
      price: 499.73,
      createdAt: '2024-06-12T15:33:41',
      updatedAt: '2024-04-22T22:58:38.506075',
    },
    {
      name: 'Focus Among',
      price: 971.46,
      createdAt: '2024-06-18T05:28:33',
      updatedAt: '2024-08-28T22:58:38.506110',
    },
    {
      name: 'Reflect Throw',
      price: 880.69,
      createdAt: '2024-07-03T09:16:10',
      updatedAt: '2023-11-05T22:58:38.506145',
    },
    {
      name: 'Financial Member',
      price: 370.96,
      createdAt: '2024-08-24T21:42:00',
      updatedAt: '2024-01-11T22:58:38.506181',
    },
    {
      name: 'Sometimes Process',
      price: 156.6,
      createdAt: '2024-02-11T17:35:35',
      updatedAt: '2023-12-09T22:58:38.506218',
    },
    {
      name: 'Material Summer',
      price: 577.51,
      createdAt: '2024-09-22T09:23:20',
      updatedAt: '2024-04-29T22:58:38.506253',
    },
    {
      name: 'Catch Though',
      price: 283.8,
      createdAt: '2023-11-03T18:29:08',
      updatedAt: '2023-10-28T22:58:38.506288',
    },
    {
      name: 'Note Team',
      price: 294.87,
      createdAt: '2023-11-19T09:47:56',
      updatedAt: '2024-04-09T22:58:38.506322',
    },
    {
      name: 'Choose A',
      price: 630.52,
      createdAt: '2024-04-11T18:43:37',
      updatedAt: '2024-07-12T22:58:38.506357',
    },
    {
      name: 'Kitchen Couple',
      price: 591.54,
      createdAt: '2023-11-07T13:08:17',
      updatedAt: '2023-10-20T22:58:38.506392',
    },
    {
      name: 'Turn Face',
      price: 540.35,
      createdAt: '2024-07-13T06:02:14',
      updatedAt: '2023-10-28T22:58:38.506426',
    },
    {
      name: 'Guess Interesting',
      price: 785.63,
      createdAt: '2024-02-26T21:23:49',
      updatedAt: '2023-12-19T22:58:38.506461',
    },
    {
      name: 'Project Investment',
      price: 131.54,
      createdAt: '2023-12-28T20:02:12',
      updatedAt: '2023-11-14T22:58:38.506508',
    },
    {
      name: 'Lay Everything',
      price: 617.8,
      createdAt: '2024-01-06T13:38:46',
      updatedAt: '2024-09-26T22:58:38.506543',
    },
    {
      name: 'Approach Central',
      price: 502.66,
      createdAt: '2024-09-11T19:46:17',
      updatedAt: '2024-09-08T22:58:38.506578',
    },
    {
      name: 'Type Whatever',
      price: 510.15,
      createdAt: '2024-04-28T06:15:08',
      updatedAt: '2024-05-05T22:58:38.506612',
    },
    {
      name: 'Various Maybe',
      price: 133.87,
      createdAt: '2023-11-13T13:30:52',
      updatedAt: '2024-09-28T22:58:38.506658',
    },
    {
      name: 'Mean Prevent',
      price: 778.46,
      createdAt: '2024-01-25T00:15:23',
      updatedAt: '2024-04-10T22:58:38.506693',
    },
    {
      name: 'Article Without',
      price: 912.13,
      createdAt: '2024-01-14T22:28:39',
      updatedAt: '2023-11-18T22:58:38.506738',
    },
    {
      name: 'Painting Show',
      price: 980.22,
      createdAt: '2024-06-01T11:08:59',
      updatedAt: '2024-09-01T22:58:38.506773',
    },
    {
      name: 'Approach Himself',
      price: 436.03,
      createdAt: '2024-01-07T04:08:51',
      updatedAt: '2023-11-18T22:58:38.506824',
    },
    {
      name: 'Discover Enjoy',
      price: 502.01,
      createdAt: '2024-02-17T19:37:32',
      updatedAt: '2023-12-29T22:58:38.506876',
    },
    {
      name: 'Certain Nor',
      price: 267.37,
      createdAt: '2023-12-23T21:28:20',
      updatedAt: '2024-01-11T22:58:38.506911',
    },
    {
      name: 'Billion Join',
      price: 682.16,
      createdAt: '2024-04-10T07:12:44',
      updatedAt: '2024-08-22T22:58:38.506962',
    },
    {
      name: 'Camera Whom',
      price: 783.57,
      createdAt: '2024-02-27T17:58:35',
      updatedAt: '2024-01-25T22:58:38.506999',
    },
    {
      name: 'Range Dream',
      price: 391.47,
      createdAt: '2024-09-28T23:11:04',
      updatedAt: '2024-04-01T22:58:38.507034',
    },
    {
      name: 'Crime Least',
      price: 877.4,
      createdAt: '2024-01-31T11:46:36',
      updatedAt: '2024-05-30T22:58:38.507068',
    },
    {
      name: 'Current Wide',
      price: 810.09,
      createdAt: '2024-07-30T11:35:45',
      updatedAt: '2023-12-03T22:58:38.507103',
    },
    {
      name: 'North Whom',
      price: 570.02,
      createdAt: '2024-03-23T15:43:09',
      updatedAt: '2024-07-20T22:58:38.507137',
    },
    {
      name: 'Show Around',
      price: 36.28,
      createdAt: '2024-06-13T22:16:16',
      updatedAt: '2023-10-19T22:58:38.507171',
    },
    {
      name: 'Majority Congress',
      price: 709.91,
      createdAt: '2024-08-24T03:58:58',
      updatedAt: '2023-10-21T22:58:38.507204',
    },
    {
      name: 'Economy Job',
      price: 501.18,
      createdAt: '2024-09-05T02:41:21',
      updatedAt: '2024-01-29T22:58:38.507239',
    },
    {
      name: 'Administration Commercial',
      price: 178.52,
      createdAt: '2024-09-26T04:22:30',
      updatedAt: '2024-01-31T22:58:38.507275',
    },
    {
      name: 'Travel Teach',
      price: 873.45,
      createdAt: '2023-10-23T06:45:49',
      updatedAt: '2023-12-17T22:58:38.507310',
    },
    {
      name: 'Identify Month',
      price: 938.96,
      createdAt: '2024-03-31T19:59:22',
      updatedAt: '2024-06-27T22:58:38.507343',
    },
    {
      name: 'Role Among',
      price: 240.54,
      createdAt: '2024-02-17T02:01:47',
      updatedAt: '2024-08-24T22:58:38.507376',
    },
    {
      name: 'Action Type',
      price: 669.34,
      createdAt: '2024-05-27T18:13:14',
      updatedAt: '2023-10-16T22:58:38.507409',
    },
    {
      name: 'Center Near',
      price: 788.54,
      createdAt: '2024-08-13T10:35:44',
      updatedAt: '2024-09-04T22:58:38.507455',
    },
    {
      name: 'Southern Within',
      price: 772.43,
      createdAt: '2024-04-12T07:31:37',
      updatedAt: '2023-11-22T22:58:38.507488',
    },
    {
      name: 'But Window',
      price: 102.55,
      createdAt: '2024-05-01T19:53:13',
      updatedAt: '2024-02-07T22:58:38.507532',
    },
    {
      name: 'Order Fly',
      price: 71.54,
      createdAt: '2024-03-31T12:09:07',
      updatedAt: '2024-05-11T22:58:38.507575',
    },
    {
      name: 'Buy Him',
      price: 370.68,
      createdAt: '2024-06-26T22:09:42',
      updatedAt: '2024-09-21T22:58:38.507621',
    },
    {
      name: 'And Stage',
      price: 27.28,
      createdAt: '2024-04-08T14:25:38',
      updatedAt: '2024-06-21T22:58:38.507658',
    },
    {
      name: 'Citizen Growth',
      price: 268.33,
      createdAt: '2024-06-16T01:24:15',
      updatedAt: '2024-05-22T22:58:38.507703',
    },
    {
      name: 'Goal Fast',
      price: 644.54,
      createdAt: '2024-02-12T07:34:43',
      updatedAt: '2023-12-29T22:58:38.507748',
    },
    {
      name: 'Trouble News',
      price: 135.18,
      createdAt: '2023-12-22T19:23:38',
      updatedAt: '2024-03-05T22:58:38.507793',
    },
    {
      name: 'Sister Such',
      price: 227.46,
      createdAt: '2023-10-25T18:05:01',
      updatedAt: '2024-03-16T22:58:38.507848',
    },
    {
      name: 'Court Series',
      price: 868.33,
      createdAt: '2023-12-23T19:52:56',
      updatedAt: '2024-02-04T22:58:38.507889',
    },
    {
      name: 'Very For',
      price: 822.86,
      createdAt: '2024-01-21T17:30:32',
      updatedAt: '2024-03-29T22:58:38.507934',
    },
    {
      name: 'Risk Themselves',
      price: 994.11,
      createdAt: '2024-01-28T16:19:00',
      updatedAt: '2024-03-23T22:58:38.507991',
    },
    {
      name: 'Item Every',
      price: 407.1,
      createdAt: '2024-01-07T10:28:40',
      updatedAt: '2024-04-26T22:58:38.508938',
    },
    {
      name: 'Foot Mission',
      price: 784.04,
      createdAt: '2024-05-22T00:24:29',
      updatedAt: '2024-03-28T22:58:38.509039',
    },
    {
      name: 'With Knowledge',
      price: 913.18,
      createdAt: '2024-09-20T00:11:02',
      updatedAt: '2024-07-10T22:58:38.509097',
    },
    {
      name: 'End Reveal',
      price: 343.82,
      createdAt: '2024-06-19T22:54:34',
      updatedAt: '2024-02-02T22:58:38.509138',
    },
    {
      name: 'Game Your',
      price: 583.13,
      createdAt: '2024-03-19T07:44:38',
      updatedAt: '2024-07-07T22:58:38.509174',
    },
    {
      name: 'Management Mention',
      price: 704.83,
      createdAt: '2024-04-19T00:59:02',
      updatedAt: '2023-11-18T22:58:38.509209',
    },
    {
      name: 'Little Reach',
      price: 979.41,
      createdAt: '2024-03-05T23:44:55',
      updatedAt: '2024-07-04T22:58:38.509244',
    },
    {
      name: 'Chair Ready',
      price: 241.28,
      createdAt: '2024-02-24T21:41:43',
      updatedAt: '2024-02-07T22:58:38.509278',
    },
    {
      name: 'South Once',
      price: 308.97,
      createdAt: '2024-07-18T00:45:16',
      updatedAt: '2024-04-20T22:58:38.509311',
    },
    {
      name: 'Under Assume',
      price: 188.74,
      createdAt: '2024-08-21T02:22:19',
      updatedAt: '2024-01-10T22:58:38.509344',
    },
    {
      name: 'Population Almost',
      price: 946.05,
      createdAt: '2024-08-14T14:29:31',
      updatedAt: '2023-11-09T22:58:38.509385',
    },
    {
      name: 'Student Respond',
      price: 577.42,
      createdAt: '2024-06-22T01:07:43',
      updatedAt: '2024-08-27T22:58:38.509428',
    },
    {
      name: 'Water Financial',
      price: 437.73,
      createdAt: '2024-02-25T20:39:51',
      updatedAt: '2024-02-29T22:58:38.509470',
    },
    {
      name: 'Rest Rich',
      price: 649.86,
      createdAt: '2024-05-13T03:35:38',
      updatedAt: '2024-06-26T22:58:38.509503',
    },
    {
      name: 'Task Beautiful',
      price: 66.2,
      createdAt: '2024-04-30T10:18:28',
      updatedAt: '2024-09-27T22:58:38.509538',
    },
    {
      name: 'Entire Evening',
      price: 278.57,
      createdAt: '2024-02-15T08:38:01',
      updatedAt: '2023-12-31T22:58:38.509595',
    },
    {
      name: 'Skill Protect',
      price: 833.65,
      createdAt: '2024-06-16T14:50:05',
      updatedAt: '2024-01-16T22:58:38.509645',
    },
    {
      name: 'Nature Deal',
      price: 280.32,
      createdAt: '2023-11-20T07:48:46',
      updatedAt: '2024-08-10T22:58:38.509718',
    },
    {
      name: 'Party Its',
      price: 202.68,
      createdAt: '2023-12-21T07:16:39',
      updatedAt: '2023-10-27T22:58:38.509754',
    },
    {
      name: 'Gas Pay',
      price: 631.25,
      createdAt: '2024-02-09T21:43:41',
      updatedAt: '2023-11-21T22:58:38.509789',
    },
    {
      name: 'Sit Material',
      price: 368.32,
      createdAt: '2024-07-17T21:13:30',
      updatedAt: '2023-10-19T22:58:38.509834',
    },
    {
      name: 'Draw Teach',
      price: 607.42,
      createdAt: '2023-12-18T21:08:17',
      updatedAt: '2024-03-15T22:58:38.509880',
    },
    {
      name: 'Bed List',
      price: 331.11,
      createdAt: '2024-04-06T23:19:39',
      updatedAt: '2024-08-16T22:58:38.509915',
    },
    {
      name: 'Generation Western',
      price: 290.71,
      createdAt: '2024-02-08T20:10:46',
      updatedAt: '2023-12-28T22:58:38.509968',
    },
    {
      name: 'Same Writer',
      price: 163.0,
      createdAt: '2024-08-09T19:51:05',
      updatedAt: '2024-05-24T22:58:38.510020',
    },
    {
      name: 'Protect Area',
      price: 105.05,
      createdAt: '2024-03-21T11:22:32',
      updatedAt: '2024-06-09T22:58:38.510066',
    },
    {
      name: 'Person Article',
      price: 325.6,
      createdAt: '2024-03-18T00:28:06',
      updatedAt: '2024-05-09T22:58:38.510124',
    },
    {
      name: 'Whom After',
      price: 815.44,
      createdAt: '2024-03-02T11:27:14',
      updatedAt: '2024-02-17T22:58:38.510177',
    },
    {
      name: 'Challenge Such',
      price: 720.7,
      createdAt: '2024-09-22T01:15:43',
      updatedAt: '2024-05-17T22:58:38.510213',
    },
    {
      name: 'Feeling Of',
      price: 27.29,
      createdAt: '2023-12-18T19:02:33',
      updatedAt: '2024-01-18T22:58:38.510248',
    },
    {
      name: 'Set Performance',
      price: 200.19,
      createdAt: '2024-01-19T22:28:07',
      updatedAt: '2023-11-12T22:58:38.510281',
    },
    {
      name: 'Evening Call',
      price: 159.68,
      createdAt: '2023-11-14T05:08:33',
      updatedAt: '2024-04-28T22:58:38.510314',
    },
    {
      name: 'Live Perform',
      price: 990.74,
      createdAt: '2024-05-26T03:55:30',
      updatedAt: '2023-11-09T22:58:38.510347',
    },
    {
      name: 'Evening Require',
      price: 37.66,
      createdAt: '2024-02-13T20:29:50',
      updatedAt: '2024-03-29T22:58:38.510379',
    },
    {
      name: 'Pay Soldier',
      price: 852.44,
      createdAt: '2024-06-30T21:29:52',
      updatedAt: '2023-10-21T22:58:38.510414',
    },
    {
      name: 'North Word',
      price: 202.05,
      createdAt: '2024-05-20T23:07:22',
      updatedAt: '2024-01-18T22:58:38.510447',
    },
    {
      name: 'Begin Evening',
      price: 566.85,
      createdAt: '2024-07-17T05:21:12',
      updatedAt: '2024-07-11T22:58:38.510491',
    },
    {
      name: 'Resource War',
      price: 978.98,
      createdAt: '2024-05-31T17:53:48',
      updatedAt: '2024-06-04T22:58:38.510536',
    },
    {
      name: 'Manage Former',
      price: 74.79,
      createdAt: '2024-03-25T03:18:59',
      updatedAt: '2024-04-22T22:58:38.510570',
    },
    {
      name: 'Remain Add',
      price: 123.7,
      createdAt: '2024-01-25T21:57:48',
      updatedAt: '2024-04-03T22:58:38.510604',
    },
  ],
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {}
  }
  @Post('seed')
  async seed() {
    return this.productsService.seed();
  }

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.productsService.findAll(pagination.page, pagination.page_size);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
