/**
 * dns 模块用于启用名称解析。例如，使用它来查找主机名的IP地址
 * 尽管以域名系统（DNS）命名，但它总不是使用DNS协议进行查找。dns.lookup()使用操作系统功能来执行名称解析。它不可能需要执行任何网络通信，
 * 希望与同一操作系统上其他应用程序相同的方式执行名称解析的开发者应使用dns.lookup().
 */

const dns = require('dns');
// 1.dns.Resolver 类
const { Resolver } = require('dns');
const resolver = new Resolver();

resolver.setServers(['4.4.4.4']);
console.log('getServers', resolver.getServers());

