+++
date = "2015-07-12T00:03:07-07:00"
levels = []
tags = ["Java Basic"]
title = "Access Control"
topics = ["Java"]
banner = "/media/java.jpg"
+++
Reading Note while reading Java Best Practice.

<!--more-->
1. Access Level
   - Private:
   - Package-private: Default
   - Protected:
   - Public
  
2. Make each class or member as inaccessiable as possible!

3. Implements Serializable may leak this class in API.

4. Instance field and static field must not be public! 
    Lost the control of this field and not thread safety but may be okay for immutable final instance field.
5. An array with not-zero length is mutable! 
   Cannnot return public static array field.
6. The only two ways to return above field is by establish a immutable list or create a public method returning clone object!

7. Don't expose the internal data field:
    public class should not expose any mutable field;