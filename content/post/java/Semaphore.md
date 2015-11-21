+++
date = "2015-11-12T09:03:07-07:00"
levels = []
tags = ["Java Multiplethread"]
title = "Mutex vs Semaphore"
topics = ["Java"]
banner = "/media/java.jpg"
+++


## What are the differences between Mutex vs Semaphore? When to use mutex and when to use semaphore?

As per operating system terminology, mutex and semaphore are kernel resources that provide synchronization services (also called as synchronization primitives). Why do we need such synchronization primitives? Won’t be only one sufficient? To answer these questions, we need to understand few keywords. Please read the posts on atomicity and critical section. We will illustrate with examples to understand these concepts well, rather than following usual OS textual description.

## The producer-consumer problem:

Note that the content is generalized explanation. Practical details vary with implementation.

Consider the standard producer-consumer problem. Assume, we have a buffer of 4096 byte length. A producer thread collects the data and writes it to the buffer. A consumer thread processes the collected data from the buffer. Objective is, both the threads should not run at the same time.

### Using Mutex:

A mutex provides mutual exclusion, either producer or consumer can have the key (mutex) and proceed with their work. As long as the buffer is filled by producer, the consumer needs to wait, and vice versa.

At any point of time, only one thread can work with the entire buffer. The concept can be generalized using semaphore.

### Using Semaphore:

A semaphore is a generalized mutex. In lieu of single buffer, we can split the 4 KB buffer into four 1 KB buffers (identical resources). A semaphore can be associated with these four buffers. The consumer and producer can work on different buffers at the same time.

## Misconception:

There is an ambiguity between binary semaphore and mutex. We might have come across that a mutex is binary semaphore. But they are not! The purpose of mutex and semaphore are different. May be, due to similarity in their implementation a mutex would be referred as binary semaphore.

### Mutex - locking mechanism
Strictly speaking, a mutex is locking mechanism used to synchronize access to a resource. Only one task (can be a thread or process based on OS abstraction) can acquire the mutex. It means there is ownership associated with mutex, and only the owner can release the lock (mutex).

### Code of Mutex
```java
class Mutex {
    private MutexStatus mutexStatus;

    public Mutex() {
        mutexStatus = MutexStatus.FREE;
    }

    public void acquire() {
        synchronized (this) {
            if (mutexStatus == MutexStatus.BUSY)
                wait();
            mutexStatus = MutexStatus.BUSY;
        }
    }

    public void release() {
        mutexStatus = MutexStatus.FREE;
    }
}
```

### Semaphore - signaling mechanism 
Semaphore is signaling mechanism **(“I am done, you can carry on” kind of signal)**. For example, if you are listening songs (assume it as one task) on your mobile and at the same time your friend calls you, an interrupt is triggered upon which an interrupt service routine (ISR) signals the call processing task to wakeup.

### Code of Semaphore
```java
public class BoundedSemaphore {
  private int signals = 0;
  private int bound   = 0;

  public BoundedSemaphore(int upperBound){
    this.bound = upperBound;
  }

  public synchronized void take() throws InterruptedException{
    while(this.signals == bound) wait();
    this.signals++;
    this.notify();
  }

  public synchronized void release() throws InterruptedException{
    while(this.signals == 0) wait();
    this.signals--;
    this.notify();
  }
}
```

## General Questions:

1. Can a thread acquire more than one lock (Mutex)?

Yes, it is possible that a thread is in need of more than one resource, hence the locks. If any lock is not available the thread will wait (block) on the lock.

2. Can a mutex be locked more than once?

A mutex is a lock. Only one state (locked/unlocked) is associated with it. However, a recursive mutex can be locked more than once (POSIX complaint systems), in which a count is associated with it, yet retains only one state (locked/unlocked). The programmer must unlock the mutex as many number times as it was locked.

3. What happens if a non-recursive mutex is locked more than once.

Deadlock. If a thread which had already locked a mutex, tries to lock the mutex again, it will enter into the waiting list of that mutex, which results in deadlock. It is because no other thread can unlock the mutex. An operating system implementer can exercise care in identifying the owner of mutex and return if it is already locked by same thread to prevent deadlocks.

4. Are binary semaphore and mutex same?

No. We suggest to treat them separately, as it is explained signalling vs locking mechanisms. But a binary semaphore may experience the same critical issues (e.g. priority inversion) associated with mutex. We will cover these in later article.

A programmer can prefer mutex rather than creating a semaphore with count 1.

5. What is a mutex and critical section?

Some operating systems use the same word critical section in the API. Usually a mutex is costly operation due to protection protocols associated with it. At last, the objective of mutex is atomic access. There are other ways to achieve atomic access like disabling interrupts which can be much faster but ruins responsiveness. The alternate API makes use of disabling interrupts.

6. What are events?

The semantics of mutex, semaphore, event, critical section, etc… are same. All are synchronization primitives. Based on their cost in using them they are different. We should consult the OS documentation for exact details.

7. Can we acquire mutex/semaphore in an Interrupt Service Routine?

An ISR will run asynchronously in the context of current running thread. It is not recommended to query (blocking call) the availability of synchronization primitives in an ISR. The ISR are meant be short, the call to mutex/semaphore may block the current running thread. However, an ISR can signal a semaphore or unlock a mutex.

8. What we mean by “thread blocking on mutex/semaphore” when they are not available?

Every synchronization primitive has a waiting list associated with it. When the resource is not available, the requesting thread will be moved from the running list of processor to the waiting list of the synchronization primitive. When the resource is available, the higher priority thread on the waiting list gets the resource (more precisely, it depends on the scheduling policies).

9. Is it necessary that a thread must block always when resource is not available?

Not necessary. If the design is sure ‘what has to be done when resource is not available‘, the thread can take up that work (a different code branch). To support application requirements the OS provides non-blocking API.

For example POSIX pthread_mutex_trylock() API. When mutex is not available the function returns immediately whereas the API pthread_mutex_lock() blocks the thread till resource is available.